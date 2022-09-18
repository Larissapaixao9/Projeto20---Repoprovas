
export  async function fixeduser(){
    
    return {
        email: "larissa@gmail.com",
        password: "larissa",
        confirmPassword: "larissa"
    }
}

export async function userLogin(){
    
    return {
        email: "larissa@gmail.com",
        password: "larissa"
    }
}

export async function userLoginWrongPassword(){
    
    return {
        email: "larissa@gmail.com",
        password: "larissaPaixao"
    }
}

export async function userLoginWrongEmail(){
    
    return {
        email: "larissaPaixaoa@gmail.com",
        password: "larissa"
    }
}

export async function userLoginEmpty(){
    
    return {
        email: "",
        password: ""
    }
}

export  async function emptyLogupInfo(){
    
    return {
        email: "",
        password: "",
        confirmPassword: ""
    }
}

export  async function examCorrectInfo(){
    
    return {
        name: "matematicaa",
        pdfUrl: "https://www.google.com/",
        categoryId:1,
        disciplineId: 1,
        instructureId: 1
    }
}

export  async function examWrongInfo(){
    
    return {
        name: "",
        pdfUrl: "",
        categoryId:1,
        disciplineId: 1,
        instructureId: 1
    }
}

// {
//     "name": "inhonho",
//     "pdfUrl": "https://www.google.com/",
//     "categoryId": 2,
//     "disciplineId": 6,
//     "instructureId": 2
//   }