//cosas pequeñas
import fs from "fs"; 
import path from "path"

//printFilesDirectory para el final, considera que solo vas a evaluar que recibes 01 archivo

//una funcion que me diga si existe el archivo, boolean
export const pathExists = (pathfile) => {
    return fs.existsSync(pathfile)
}
//extensión de ruta
export const isMD = (file) => {
    return path.extname(file)
}



  