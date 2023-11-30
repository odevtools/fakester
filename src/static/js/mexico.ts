import {clearString, getFirstInternalConsonant, getFirstInternalVowel} from "./utils";

const states = {
    'AGUASCALIENTES': 'AS',
    'BAJA CALIFORNIA': 'BC',
    'BAJA CALIFORNIA NORTE': 'BC',
    'BAJA CALIFORNIA SUR': 'BS',
    'CAMPECHE': 'CC',
    'COAHUILA': 'CL',
    'COLIMA': 'CM',
    'CHIAPAS': 'CS',
    'CHIHUAHUA': 'CH',
    'CIUDAD DE MEXICO': 'DF',
    'DISTRITO FEDERAL': 'DF',
    'DURANGO': 'DG',
    'GUANAJUATO': 'GT',
    'GUERRERO': 'GR',
    'HIDALGO': 'HG',
    'JALISCO': 'JC',
    'MEXICO': 'MC',
    'MICHOACAN': 'MN',
    'MORELOS': 'MS',
    'NAYARIT': 'NT',
    'NUEVO LEON': 'NL',
    'OAXACA': 'OC',
    'PUEBLA': 'PL',
    'QUERETARO': 'QT',
    'QUINTANA ROO': 'QR',
    'SAN LUIS POTOSI': 'SP',
    'SINALOA': 'SL',
    'SONORA': 'SR',
    'TABASCO': 'TC',
    'TAMAULIPAS': 'TS',
    'TLAXCALA': 'TL',
    'VERACRUZ': 'VZ',
    'YUCATAN': 'YN',
    'ZACATECAS': 'ZS'
}

const notAcceptedNames = [
    'MARIA DEL ',
    'MARIA DE LOS ',
    'MARIA ',
    'JOSE DE ',
    'JOSE ',
    'MA. ',
    'MA ',
    'M. ',
    'J. ',
    'J '
]

const prefixes = [
    'DE ',
    'DEL '
]

const badWordsCURP = {
    "BACA": "BXCA",
    "LOCO": "LXCO",
    "BAKA": "BXKA",
    "BUEI": "BXEI",
    "BUEY": "BXEY",
    "CACA": "CXCA",
    "CACO": "CXCO",
    "CAGA": "CXGA",
    "CAGO": "CXGO",
    "CAKA": "CXKA",
    "CAKO": "CXKO",
    "COGE": "CXGE",
    "COGI": "CXGI",
    "COJA": "CXJA",
    "COJE": "CXJE",
    "COJI": "CXJI",
    "COJO": "CXJO",
    "COLA": "CXLA",
    "CULO": "CXLO",
    "FALO": "FXLO",
    "FETO": "FXTO",
    "GETA": "GXTA",
    "GUEI": "GXEI",
    "GUEY": "GXEY",
    "JETA": "JXTA",
    "JOTO": "JXTO",
    "KACA": "KXCA",
    "KACO": "KXCO",
    "KAGA": "KXGA",
    "KAGO": "KXGO",
    "KAKA": "KXKA",
    "KAKO": "KXKO",
    "KOGE": "KXGE",
    "KOGI": "KXGI",
    "KOJA": "KXJA",
    "KOJE": "KXJE",
    "KOJI": "KXJI",
    "KOJO": "KXJO",
    "KOLA": "KXLA",
    "KULO": "KXLO",
    "LILO": "LXLO",
    "LOKA": "LXKA",
    "LOKO": "LXKO",
    "MAME": "MXME",
    "MAMO": "MXMO",
    "MEAR": "MXAR",
    "MEAS": "MXAS",
    "MEON": "MXON",
    "MIAR": "MXAR",
    "MION": "MXON",
    "MOCO": "MXCO",
    "MOKO": "MXKO",
    "MULA": "MXLA",
    "MULO": "MXLO",
    "NACA": "NXCA",
    "NACO": "NXCO",
    "PEDA": "PXDA",
    "PEDO": "PXDO",
    "PENE": "PXNE",
    "PIPI": "PXPI",
    "PITO": "PXTO",
    "POPO": "PXPO",
    "PUTA": "PXTA",
    "PUTO": "PXTO",
    "QULO": "QXLO",
    "RATA": "RXTA",
    "ROBA": "RXBA",
    "ROBE": "RXBE",
    "ROBO": "RXBO",
    "RUIN": "RXIN",
    "SENO": "SXNO",
    "TETA": "TXTA",
    "VACA": "VXCA",
    "VAGA": "VXGA",
    "VAGO": "VXGO",
    "VAKA": "VXKA",
    "VUEI": "VXEI",
    "VUEY": "VXEY",
    "WUEI": "WXEI",
    "WUEY": "WXEY"
}

const badWordsRFC = {
    "BUEI": "BUEX",
    "BUEY": "BUEX",
    "CACA": "CACX",
    "CACO": "CACX",
    "CAGA": "CAGX",
    "CAGO": "CAGX",
    "CAKA": "CAKX",
    "COGE": "COGX",
    "COJA": "COJX",
    "COJE": "COJX",
    "COJI": "COJX",
    "COJO": "COJX",
    "CULO": "CULX",
    "FETO": "FETX",
    "GUEY": "GUEX",
    "JOTO": "JOTX",
    "KACA": "KACX",
    "KACO": "KACX",
    "KAGA": "KAGX",
    "KAGO": "KAGX",
    "KOGE": "KOGX",
    "KOJO": "KOJX",
    "KAKA": "KAKX",
    "KULO": "KULX",
    "MAME": "MAMX",
    "MAMO": "MAMX",
    "MEAR": "MEAX",
    "MEON": "MEOX",
    "MION": "MIOX",
    "MOCO": "MOCX",
    "MULA": "MULX",
    "PEDA": "PEDX",
    "PEDO": "PEDX",
    "PENE": "PENX",
    "PUTA": "PUTX",
    "PUTO": "PUTX",
    "QULO": "QULX",
    "RATA": "RATX",
    "RUIN": "RUIX"
}

const characterValues = {
    "0": '00',
    "1": '01',
    "2": '02',
    "3": '03',
    "4": '04',
    "5": '05',
    "6": '06',
    "7": '07',
    "8": '08',
    "9": '09',
    "A": '10',
    "B": '11',
    "C": '12',
    "D": '13',
    "F": '15',
    "E": '14',
    "G": '16',
    "H": '17',
    "I": '18',
    "J": '19',
    "K": '20',
    "L": '21',
    "M": '22',
    "N": '23',
    "&": '24',
    "O": '25',
    "P": '26',
    "Q": '27',
    "R": '28',
    "S": '29',
    "T": '30',
    "U": '31',
    "V": '32',
    "W": '33',
    "X": '34',
    "Y": '35',
    "Z": '36',
    " ": '37',
    "Ñ": '38'
}

function getCommonPart(name, surnameFather, surnameMother, bornDay, bornMonth, bornYear, type) {
    let commonPart = surnameFather[0];
    commonPart += getFirstInternalVowel(surnameFather);
    commonPart += surnameMother[0] || 'X';
    commonPart += name[0];
    commonPart = removeBadWords(commonPart, type)
    commonPart += bornYear.substring(2);
    commonPart += bornMonth;
    commonPart += bornDay;
    return commonPart;
}

function getBornStateCode(idState) {
    return states[idState];
}

function getGenderLetter(idGender) {
    return idGender === "MALE" ? 'H' : 'M';
}

function getSpecialChar(bornYear) {
    if (bornYear[0] == '1') {
        return '0';
    } else {
        return 'A';
    }
}

function removeCommonNames(name) {
    notAcceptedNames.forEach(
        function (notAccepted) {
            name = name.replace(new RegExp('^' + notAccepted), '');
        }
    );

    return name;
}

function removePrefixes(name) {
    prefixes.forEach(
        function (notAccepted) {
            name = name.replace(new RegExp('^' + notAccepted), '');
        }
    );

    return name;
}

function removeBadWords(word, type) {
    let badWordsList;

    if (type === 0) {
        badWordsList = badWordsCURP
    } else {
        badWordsList = badWordsRFC
    }

    if (badWordsList[word]) {
        return badWordsList[word]
    }

    return word;
}

// remove accents without removing the Ñ (u0303)
// and remove special characters: .'-,
function normalize(input) {
    return input
        .toUpperCase()
        .normalize('NFD')
        .replace(/[\u0300-\u0302]/g, '')
        .replace(/[\u0304-\u036f]/g, '')
        .replace(/N\u0303/g, 'Ñ')
        .replace(/[-\.',]/g, '') // remove .'-,
}

function sumPairsOfDigits(input) {
    let sum = 0
    for (let i = 0; i < input.length - 1; i++) {
        let firstPair = parseInt(input.substring(i, i + 2), 10)
        let secondPair = parseInt(input.substring(i + 1, i + 2), 10)
        sum += firstPair * secondPair
    }
    return sum
}

function mapCharacterToTwoDigitsCode(c) {
    const map = {
        ' ': '00',
        '0': '00',
        '1': '01',
        '2': '02',
        '3': '03',
        '4': '04',
        '5': '05',
        '6': '06',
        '7': '07',
        '8': '08',
        '9': '09',
        '&': '10',
        'A': '11',
        'B': '12',
        'C': '13',
        'D': '14',
        'E': '15',
        'F': '16',
        'G': '17',
        'H': '18',
        'I': '19',
        'J': '21',
        'K': '22',
        'L': '23',
        'M': '24',
        'N': '25',
        'O': '26',
        'P': '27',
        'Q': '28',
        'R': '29',
        'S': '32',
        'T': '33',
        'U': '34',
        'V': '35',
        'W': '36',
        'X': '37',
        'Y': '38',
        'Z': '39',
        'Ñ': '40'
    }
    const m = map[c]
    if (!m) {
        throw Error(`No two-digit code mapping for char ${c}`)
    }
    return m
}

function getLastRFCDigits(fullName) {
    const dictionary = '123456789ABCDEFGHIJKLMNPQRSTUVWXYZ'
    const mappedFullName = '0' + normalize(fullName)
        .split('')
        .map(mapCharacterToTwoDigitsCode)
        .join('')

    const sum = sumPairsOfDigits(mappedFullName)
    const lastThreeDigits = sum % 1000
    const quo = lastThreeDigits / 34
    const reminder = lastThreeDigits % 34
    return dictionary.charAt(quo) + dictionary.charAt(reminder)
}

function getRFCVerificationDigit(rfc) {
    const sum = rfc
        .split('')
        .map(c => characterValues[c.toUpperCase()] || 0)
        .reduce((sum, current, index) => sum + current * (13 - index), 0)
    const reminder = sum % 11
    if (reminder === 0) {
        return '0'
    } else {
        return (11 - reminder).toString(16).toUpperCase() // from 1 to A (hex)
    }
}

function getLastCURPDigit(curp) {
    const dictionary = '0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'
    let lnSum = 0.0
    let lnDigt = 0.0

    for (let i = 0; i < 17; i++) {
        lnSum = lnSum + dictionary.indexOf(curp.charAt(i)) * (18 - i)
    }

    lnDigt = 10 - lnSum % 10
    if (lnDigt === 10) return 0
    return lnDigt
}

export function rfc(name, surnameFather, surnameMother, bornDay, bornMonth, bornYear) {
    name = clearString(name);
    surnameFather = clearString(surnameFather);
    surnameMother = clearString(surnameMother);
    bornDay = clearString(bornDay);
    bornMonth = clearString(bornMonth);
    bornYear = clearString(bornYear);

    let rfc = getCommonPart(name, surnameFather, surnameMother, bornDay, bornMonth, bornYear, 1);
    rfc += getLastRFCDigits(`${name} ${surnameMother} ${surnameFather}`)
    rfc += getRFCVerificationDigit(rfc)
    return rfc
}

export function curp(name, surnameFather, surnameMother, bornDay, bornMonth, bornYear, bornState, gender) {
    name = clearString(name);
    name = removeCommonNames(name);
    surnameFather = clearString(surnameFather);
    surnameFather = removePrefixes(surnameFather);
    surnameMother = clearString(surnameMother);
    surnameMother = removePrefixes(surnameMother);
    bornDay = clearString(bornDay);
    bornMonth = clearString(bornMonth);
    bornYear = clearString(bornYear);

    let curp = getCommonPart(name, surnameFather, surnameMother, bornDay, bornMonth, bornYear, 0);
    curp = removeBadWords(curp, 0)
    curp += getGenderLetter(gender);
    curp += getBornStateCode(bornState);
    curp += getFirstInternalConsonant(surnameFather);
    curp += getFirstInternalConsonant(surnameMother);
    curp += getFirstInternalConsonant(name);
    curp += getSpecialChar(bornYear);
    curp += getLastCURPDigit(curp)

    return curp;
}