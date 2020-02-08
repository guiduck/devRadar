module.exports = function parseStringAsArray(arrayAsString) {
    //divide o array em varios na virgula e da trim nos espaços em branco
    return arrayAsString.split(',').map(tech => tech.trim());
}