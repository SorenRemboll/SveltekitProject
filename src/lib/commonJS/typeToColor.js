export const typeToColorHex = (typeString) => {
    let returnString = ''
    switch (typeString.toLowerCase()) {
        case 'water':
            returnString ='#5C78FA';
            break;
        case 'fire':
            returnString = '#ff3737';
            break;
        case 'grass':
            returnString = '#39f64c';
            break;
        case 'electric':
            returnString = '#FFFB00';
            break;
        case 'poison':
            returnString = '#BB47F6';
            break;
        case 'normal':
            returnString = '#EDF0FF';
            break;
        case 'ice':
            returnString = '#2FF5EC';
            break;
        case 'rock':
            returnString = '#AC985E';
            break;
        case 'ground':
            returnString = '#D5BA6F';
            break;
        case 'dark':
            returnString = '#626262';
            break;
        case 'psychic':
            returnString = '#EE5B87';
            break;
        case 'ghost':
            returnString = '#7f7ff9';
            break;
        case 'flying':
            returnString = '#96A3DB';
            break;
        case 'fairy':
            returnString = '#E1B1E4';
            break;
        case 'bug':
            returnString = '#ACB234';
            break;
        case 'fighting':
            returnString = '#a3483f';
            break;
        case 'steel':
            returnString = '#bebebe';
            break;
        case 'dragon':
            returnString = '#5740e8';
            break;
    }
    return returnString
}