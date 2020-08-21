/**
   MORE Technologies MOREbot Microbit Shield Library
**/

/**
 * Functions to operate the the MOREbot Microbit Shield Ports.
 */
//% weight=3 color=#ED672D icon="\uF2DB" block="MOREbot Blocks"
//% groups=['General', Universal I/O', 'Servo', 'I2C']
//% subcategories=['Motion, 'I/O', 'Advanced']
namespace morebot {
    const PCAADDRESS = 0x40
    const ADSADDR007 = 0x17
    const ADSADDR815 = 0x10

    const PCAMODEREG = 0x00
    const PCAMOD2REG = 0x01
    const PCALED1REG = 0x06
    const PCAALOLREG = 0xFA
    const PCAPRSCREG = 0xFE

    const PCASTDFREQ = 60
    const PCAINTCLCK = 27000000

    const PCAMODEALL = 0x01
    const PCAMODESLP = 0x10
    const PCAMODEAIN = 0x20
    const PCAMODERST = 0x80

    const PCAMOD2OPS = 0x00
    const PCAMOD2TTP = 0x04

    const ADSGENCALL = 0x00
    const ADSADDRRST = 0x04
    const ADSSOFTRST = 0x06
    const ADSWRITREG = 0x08
    const ADSREADREG = 0x10

    const ADSGENCFGR = 0x01
    const ADSDATCFGR = 0x02
    const ADSOSRCFGR = 0x03
    const ADSOPMCFGR = 0x04
    const ADSPINCFGR = 0x05
    const ADSGPICFGR = 0x07
    const ADSGPIOUTR = 0x0B
    const ADSGPIINPR = 0x0D
    const ADSSEQCFGR = 0x10
    const ADSCHLSELR = 0x11

    let threshold = 2047
    let pulsewidth = 4095

    //% blockID="MOREbot_servo_get" block="Get servo on %pin=uioportsout"
    //% weight=1 group='Servo'
    //% subcategory=Motion
    export function getServo(pin: number): Servo {
        return new Servo(pin)
    }

    export enum uioports {
        //% block="UI/O Port 1"
        uio1 = 0,
        //% block="UI/O Port 2"
        uio2 = 1,
        //% block="UI/O Port 3"
        uio3 = 2,
        //% block="UI/O Port 4"
        uio4 = 3,
        //% block="UI/O Port 5"
        uio5 = 4,
        //% block="UI/O Port 6"
        uio6 = 5,
        //% block="UI/O Port 7"
        uio7 = 6,
        //% block="UI/O Port 8"
        uio8 = 7
    }

    export enum uioportsexpanded {
        //% block="UI/O Pin 1.1"
        uio1_1 = 0,
        //% block="UI/O Pin 1.2"
        uio1_2 = 1,
        //% block="UI/O Pin 2.1"
        uio2_1 = 2,
        //% block="UI/O Pin 2.2"
        uio2_2 = 3,
        //% block="UI/O Pin 3.1"
        uio3_1 = 4,
        //% block="UI/O Pin 3.2"
        uio3_2 = 5,
        //% block="UI/O Pin 4.1"
        uio4_1 = 6,
        //% block="UI/O Pin 4.2"
        uio4_2 = 7,
        //% block="UI/O Pin 5.1"
        uio5_1 = 8,
        //% block="UI/O Pin 5.2"
        uio5_2 = 9,
        //% block="UI/O Pin 6.1"
        uio6_1 = 10,
        //% block="UI/O Pin 6.2"
        uio6_2 = 11,
        //% block="UI/O Pin 7.1"
        uio7_1 = 12,
        //% block="UI/O Pin 7.2"
        uio7_2 = 13,
        //% block="UI/O Pin 8.1"
        uio8_1 = 14,
        //% block="UI/O Pin 8.2"
        uio8_2 = 15,
    }

    //% blockId="uioportsout" block="%port"
    //% group='Universal I/O' weight=60
    //% subcategory=I/O
    export function uioportsout(port: uioports): number {
        switch (port) {
            case uioports.uio1: return 0;
            case uioports.uio2: return 1;
            case uioports.uio3: return 2;
            case uioports.uio4: return 3;
            case uioports.uio5: return 4;
            case uioports.uio6: return 5;
            case uioports.uio7: return 6;
            case uioports.uio8: return 7;
        }
    }

    //% blockId="uioportsoutexpanded" block="%port"
    //% group='Universal I/O' weight=60
    //% subcategory=I/O
    export function uioportsexpandedout(port: uioportsexpanded): number {
        switch (port) {
            case uioportsexpanded.uio1_1: return 0;
            case uioportsexpanded.uio1_2: return 8;
            case uioportsexpanded.uio2_1: return 1;
            case uioportsexpanded.uio2_2: return 9;
            case uioportsexpanded.uio3_1: return 2;
            case uioportsexpanded.uio3_2: return 10;
            case uioportsexpanded.uio4_1: return 3;
            case uioportsexpanded.uio4_2: return 11;
            case uioportsexpanded.uio5_1: return 4;
            case uioportsexpanded.uio5_2: return 12;
            case uioportsexpanded.uio6_1: return 5;
            case uioportsexpanded.uio6_2: return 13;
            case uioportsexpanded.uio7_1: return 6;
            case uioportsexpanded.uio7_2: return 14;
            case uioportsexpanded.uio8_1: return 7;
            case uioportsexpanded.uio8_2: return 15;
        }
    }

    export enum digitalout {
        //% block="LOW"
        Low = 0,
        //% block="HIGH"
        High = 1
    }

    //% blockId="digitalLevels" block="%level"
    //% group='Universal I/O' weight=49
    //% subcategory=I/O
    export function digitalLevels(level: digitalout): number {
        switch (level) {
            case digitalout.Low: return 0;
            case digitalout.High: return 1;
        }
    }

    //% blockID="MOREbot_api_setup" block="Setup MOREbot Shield"
    //% group='General' weight=100
    export function setup() {
        writeArrayI2C([ADSWRITREG, ADSPINCFGR, 0x00], ADSADDR007)
        writeArrayI2C([ADSWRITREG, ADSOSRCFGR, 0x07], ADSADDR007)

        writeArrayI2C([ADSWRITREG, ADSSEQCFGR, 0x00], ADSADDR007)
        writeArrayI2C([ADSWRITREG, ADSOPMCFGR, 0x00], ADSADDR007)

        writeArrayI2C([ADSWRITREG, ADSPINCFGR, 0x00], ADSADDR815)
        writeArrayI2C([ADSWRITREG, ADSOSRCFGR, 0x07], ADSADDR815)

        writeArrayI2C([ADSWRITREG, ADSSEQCFGR, 0x00], ADSADDR815)
        writeArrayI2C([ADSWRITREG, ADSOPMCFGR, 0x00], ADSADDR815)

        writeArrayI2C([PCAMOD2REG, PCAMOD2TTP], PCAADDRESS)
        writeArrayI2C([PCAMODEREG, PCAMODERST], PCAADDRESS)

        basic.pause(10)

        setPCAFreq(PCASTDFREQ)

        setPCA_ALLPWM(0,0)
    }

    //% blockID="MOREbot_analog_read" block="Analog value on %pin=uioportsout"
    //% group='Universal I/O'
    //% subcategory=I/O
    export function readAnalog(pin: number): number {
        let adsAddr = -1;
        if (pin > 15 || pin < 0) return -1
        if(pin % 8 > 3){
        	adsAddr = ADSADDR815
        } 
        else{
        	adsAddr = ADSADDR007
        }
        if(pin < 8){
        	pin = (pin%4)*2+1
        }else{
            pin = (pin%4)*2
        }
        writeArrayI2C([ADSWRITREG, ADSCHLSELR, pin & 0x0F], adsAddr)
        let outputRAW = pins.i2cReadNumber(adsAddr, NumberFormat.UInt16BE, false)
        let ch = outputRAW & 0x000F
        let output = outputRAW >> 4
        return output
    }

    //% blockID="MOREbot_digital_read" block="Digital value on %pin=uioportsout"
    //% group='Universal I/O'
    //% subcategory=I/O
    export function readDigital(pin: number): number {
        let aIn = readAnalog(pin)
        if (aIn > threshold) return digitalout.High
        else return digitalout.Low
    }

    //% blockID="MOREbot_digital_write" block="Set %pin=uioportsout| to digital value %level"
    //% group='Universal I/O' weight=48
    //% subcategory=I/O
    export function writeDigital(pin: number, level: number) {
        if (level > 1) level = 1
        else level = 0

        let pulseLen = level * 4095

        setPCA_PWM(pin, 0x0000, pulseLen)
    }

    //% blockID="MOREbot_digital_threshSet" block="Set the digital HIGH threshold to %newThresh| from 0 to 4095"
    //% group='Universal I/O'
    //% newThresh.min=0 newThresh.max=4095 newThresh.defl=2047
    //% subcategory=Advanced
    export function setDigitalReadLevel(newThresh: number) {
        if (newThresh < 0) threshold = 0
        else if (newThresh > 4095) threshold = 4095
        else threshold = newThresh
    }

    //% blockID="MOREbot_api_PCA_Freq" block="Set the operating frequency for the PWM outputs to %freq"
    //% group='I2C'
    //% subcategory=Advanced
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
    //% group='I2C'
    //% subcategory=Advanced
    export function readPCARegister(register: number): number {
        pins.i2cWriteNumber(PCAADDRESS, register, NumberFormat.UInt8LE, false)
        return pins.i2cReadNumber(PCAADDRESS, NumberFormat.UInt8LE)
    }

    //% blockID="MOREbot_api_PCA_Write" block="Set the PWM waveform for %pinNum=uioportsout| to start at %pulseStart| and last for %pulseLength| out of 4095"
    //% group='I2C'
    //% subcategory=Advanced
    export function setPCA_PWM(pinNum: number, pulseStart: number, pulseLength: number) {
        if (pinNum > 15 || pinNum < 0) return
    	if(pinNum < 7){
        	pinNum = 2*pinNum
        }else{
        	pinNum = 2*(pinNum-8)+1
        }
    	if(pinNum < 8){
        	pinNum=7-pinNum    		
    	}  	
        if (pulseStart < 0) pulseStart = 0
        else if (pulseStart > pulsewidth) pulseStart = pulsewidth
        if (pulseLength < 0) pulseLength = 0
        else if (pulseLength > pulsewidth) pulseLength = pulsewidth

        let PINREGONL = PCALED1REG + 4 * pinNum

        let scrubPulse1 = pins.createBuffer(2)
        scrubPulse1.setNumber(NumberFormat.UInt16LE, 0, pulseStart)
        let on = scrubPulse1.getNumber(NumberFormat.UInt16LE, 0)

        let scrubPulse2 = pins.createBuffer(2)
        scrubPulse2.setNumber(NumberFormat.UInt16LE, 0, pulseLength)
        let off = scrubPulse2.getNumber(NumberFormat.UInt16LE, 0)

        writeArrayI2C([PINREGONL, on, on >> 8, off, off >> 8], PCAADDRESS)
    }

    //% blockID="MOREbot_api_PCA_WriteAll" block="Set the PWM waveform for all ports to start at %pulseStart| and last for %pulseLength| out of 4095"
    //% group='I2C'
    //% subcategory=Advanced
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
    	//% subcategory=Motion
        setPosition(pos: number) {
            if (pos > 180) pos = 180
            if (pos < 0) pos = 0

            let pulseLen = ((pos / 180.0) * 450 + 125)

            setPCA_PWM(this._pin, 0x0000, pulseLen)
        }

		/**
		 * Gets the position of a Servo
		 */
        //% blockID="MOREbot_servo_getPosition" block="get the position of %servo"
        //% weight=3 group='Servo'
    	//% subcategory=Motion
        getPosition(): number {
            let PINREGONL = PCALED1REG + this._pin * 4
            return readPCARegister(PINREGONL)
        }
    }

    //% blockID="I2CWriteByteArray" block="|Send bytes %byteArray|to I2C address %address|"
    //% group='I2C'
    //% subcategory=Advanced
    export function writeArrayI2C(byteArray: number[], address: number) {
        const dLen = byteArray.length
        let dataOut = pins.createBuffer(dLen)

        for (let dataItr = 0; dataItr < dLen; dataItr++) {
            dataOut.setNumber(NumberFormat.UInt8LE, dataItr, byteArray[dataItr])
        }

        pins.i2cWriteBuffer(address, dataOut, false)
    }
}