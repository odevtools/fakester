import * as IBAN from "iban";

export function pad(t: string, i: number): string {
    return (t = t.toString()).length < i ? pad("0" + t, i) : t;
}

export function getFirstInternalVowel(word: string): string {
    const vowels = word.substring(1).match(new RegExp('[AEIOU]'));
    if (vowels) {
        return vowels[0] || 'X';
    } else {
        return 'X'
    }
}

export function getFirstInternalConsonant(word: string): string {
    const vowels = word.substring(1).match(new RegExp('[BCDFGHJKLMNPQRSTUVWXYZ]'));
    if (vowels) {
        return vowels[0] || 'X';
    } else {
        return 'X'
    }
}

export function clearString(word: string): string {
    let cleanWord = word.trim();
    cleanWord = cleanWord.replace(/\s/g, ' ');
    cleanWord = this.removeAccents(cleanWord.toUpperCase());
    return cleanWord;
}

export function removeAccents(word: string): string {
    const accents = {
        'Á': 'A',
        'É': 'E',
        'Í': 'I',
        'Ó': 'O',
        'Ú': 'U'
    }

    for (const accented in accents) {
        word = word.replace(new RegExp(accented), accents[accented]);
    }

    return word;
}

export function formatIBAN(value: string): string {
    return IBAN.printFormat(value);
}

export function formatBBAN(value: string): string {
    return IBAN.printFormat(value);
}