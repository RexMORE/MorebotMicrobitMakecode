/**
   MORE Technologies MOREbot Microbit Shield Library
**/

/**
 * Functions to operate the the MOREbot Microbit Shield Ports.
 */
//% weight=3 color=#ED672D icon="\uF2DB" block="MOREbot Blocks"
//% groups=['General', Universal I/O', 'Servo', 'I2C']
namespace morebot {
    const PCAADDRESS = 0x40
    const ADSADDRESS = 0x17

    const PCAMODEREG = 0x00
    const PCALED1REG = 0x06
    const PCAALOLREG = 0xFA
    const PCAPRSCREG = 0xFE

    const PCASTDFREQ = 50
    const PCAINTCLCK = 27000000

    const PCAMODEALL = 0x01
    const PCAMODESLP = 0x10
    const PCAMODEAIN = 0x20
    const PCAMODERST = 0x80

    const ADSGENCALL = 0x00
    const ADSADDRRST = 0x04
    const ADSSOFTRST = 0x06
    const ADSWRITREG = 0x08
    const ADSREADREG = 0x10

    const ADSGENCFGR = 0x01
    const ADSDATCFGR = 0x02
    const ADSOPMCFGR = 0x04
    const ADSPINCFGR = 0x05
    const ADSGPICFGR = 0x07
    const ADSGPIOUTR = 0x0B
    const ADSGPIINPR = 0x0D
    const ADSSEQCFGR = 0x10
    const ADSCHLSELR = 0x11

    let threshold = 2047
    let pulsewidth = 4096

    //% emitAsConstant
    enum digitalout {
        //% block="LOW"
        Low = 0,
        //% block="HIGH"
        High = 1
    }

    //% enumIdentity="digitalout.Low"
    export const LOW = digitalout.Low
    //% enumIdentity="digitalout.High"
    export const HIGH = digitalout.High

    //% blockID="MOREbot_api_setup" block="Setup MOREbot Shield"
    //% group='General' weight=0
    export function setup() {
        writeArrayI2C([ADSWRITREG, ADSPINCFGR, 0x00], ADSADDRESS)

        writeArrayI2C([ADSWRITREG, ADSSEQCFGR, 0x00], ADSADDRESS)
        writeArrayI2C([ADSWRITREG, ADSOPMCFGR, 0x00], ADSADDRESS)

        writeArrayI2C([PCAMODEREG, PCAMODERST], PCAADDRESS)

        basic.pause(10)

        setPCAFreq(PCASTDFREQ)
    }

    //% blockID="MOREbot_analog_read" block="Analog value on port %pin"
    //% group='Universal I/O'
    export function readAnalog(pin: number): number {
        if (pin > 7 || pin < 0) return -1
        writeArrayI2C([ADSWRITREG, ADSCHLSELR, pin & 0x0F], ADSADDRESS)
        let outputRAW = pins.i2cReadNumber(ADSADDRESS, NumberFormat.UInt16LE, false)
        let ch = outputRAW & 0x000F
        let output = outputRAW >> 4
        return output
    }

    //% blockID="MOREbot_digital_read" block="Digital value on port %pin"
    //% group='Universal I/O'
    export function readDigital(pin: number): number {
        let aIn = readAnalog(pin)
        if (aIn > threshold) return HIGH
        else return LOW
    }

    //% blockID="MOREbot_digital_write" block="Set port %pin| to digital value %level"
    //% group='Universal I/O'
    export function writeDigital(pin: number, level: number = HIGH) {
        if (level > 1) level = 1
        else level = 0
        if (level) {
            setPCA_PWM(pin, 0, pulsewidth)
        } else {
            setPCA_PWM(pin, 0, 0)
        }
    }

    //% blockID="MOREbot_digital_threshSet" block="Set the digital HIGH threshold to %newThresh| from 0 to 4095"
    //% advanced=true group='Universal I/O'
    //% newThresh.min=0 newThresh.max=4095 newThresh.defl=2047
    export function setDigitalReadLevel(newThresh: number) {
        if (newThresh < 0) threshold = 0
        else if (newThresh > 4095) threshold = 4095
        else threshold = newThresh
    }

    //% blockID="MOREbot_api_PCA_Freq" block="Set the operating frequency for the PWM outputs to %freq"
    //% advanced=true group='I2C'
    export function setPCAFreq(freq: number) {
        let prescale = (PCAINTCLCK / 4096) / freq - 1
        let oldMode1 = readPCARegister(PCAMODEREG)
        let newMode1 = (oldMode1 % ~PCAMODERST) | PCAMODESLP

        writeArrayI2C([PCAMODEREG, newMode1], PCAADDRESS)

        writeArrayI2C([PCAPRSCREG, prescale], PCAADDRESS)

        writeArrayI2C([PCAMODEREG, oldMode1], PCAADDRESS)

        basic.pause(5)

        writeArrayI2C([PCAMODEREG, oldMode1 | 0x80 | 0x20], PCAADDRESS)
    }

    //% blockID="MOREbot_api_PCA_Read" block="Read the %register|register from the PCS chip"
    //% advanced=true group='I2C'
    export function readPCARegister(register: number): number {
        pins.i2cWriteNumber(PCAADDRESS, register, NumberFormat.UInt8LE, false)
        return pins.i2cReadNumber(PCAADDRESS, NumberFormat.UInt8LE)
    }

    //% blockID="MOREbot_api_PCA_Write" block="Set the PWM waveform for the %pinNum|output to start at %pulseStart| and last for %pulseLength| out of 4095"
    //% advanced=true group='I2C'
    export function setPCA_PWM(pinNum: number, pulseStart: number, pulseLength: number) {
        if (pulseStart < 0) pulseStart = 0
        else if (pulseStart > pulsewidth) pulseStart = pulsewidth
        if (pulseLength < 0) pulseLength = 0
        else if (pulseLength > pulsewidth - pulsewidth) pulseLength = pulsewidth - pulseStart

        let PINREGONL = PCALED1REG + 4 * pinNum

        let scrubPulse1 = pins.createBuffer(2)
        scrubPulse1.setNumber(NumberFormat.UInt16LE, 0, pulseStart)
        let on = scrubPulse1.getNumber(NumberFormat.UInt16LE, 0)

        let scrubPulse2 = pins.createBuffer(2)
        scrubPulse2.setNumber(NumberFormat.UInt16LE, 0, pulseLength)
        let off = scrubPulse2.getNumber(NumberFormat.UInt16LE, 0)

        writeArrayI2C([PINREGONL, on, on >> 8, off, off >> 8], PCAADDRESS)
    }

    export function setPCA_ALLPWM(pulseStart: number, pulseLength: number) {
        let scrubPulse1 = pins.createBuffer(2)
        scrubPulse1.setNumber(NumberFormat.UInt16LE, 0, pulseStart)
        let on = scrubPulse1.getNumber(NumberFormat.UInt16LE, 0)

        let scrubPulse2 = pins.createBuffer(2)
        scrubPulse2.setNumber(NumberFormat.UInt16LE, 0, pulseLength)
        let off = scrubPulse2.getNumber(NumberFormat.UInt16LE, 0)

        writeArrayI2C([PCAALOLREG, on, on >> 8, off, off >> 8], PCAADDRESS)
    }

    export class Servo {
        _pin: number;

        constructor(pin: number) {
            this._pin = pin
        }

		/**
		 * Sets the position of a Servo
		 */
        //% blockID="MOREbot_servo_setPosition" block="set the position of %servo| to %pos"
        //% weight=2 group='Servo'
        //% pos.min=0 pos.max=180 pos.defl=90
        setPosition(pos: number) {
            if (pos > 180) pos = 180
            if (pos < 0) pos = 0

            let pulseLen = (pos / 180.0) * 425 + 75

            setPCA_PWM(this._pin, 0x0000, pulseLen)
        }

		/**
		 * Gets the position of a Servo
		 */
        //% blockID="MOREbot_servo_getPosition" block="get the position of %servo"
        //% weight=3 group='Servo'
        getPosition(): number {
            let PINREGONL = PCALED1REG + this._pin * 4
            return readPCARegister(PINREGONL)
        }
    }

    //% blockID="MOREbot_servo_get" block="Get servo on pin %pin"
    //% weight=1 group='Servo'
    export function getServo(pin: number): Servo {
        return new Servo(pin)
    }

    //% blockID="I2CWriteByteArray" block="|Send bytes %byteArray|to I2C address %address|"
    //% advanced=true group='I2C'
    export function writeArrayI2C(byteArray: number[], address: number) {
        const dLen = byteArray.length
        let dataOut = pins.createBuffer(dLen)

        for (let dataItr = 0; dataItr < dLen; dataItr++) {
            dataOut.setNumber(NumberFormat.UInt8LE, dataItr, byteArray[dataItr])
        }

        pins.i2cWriteBuffer(address, dataOut, false)
    }
}