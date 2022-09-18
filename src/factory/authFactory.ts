
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