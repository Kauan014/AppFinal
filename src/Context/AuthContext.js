
import {createContext, useEffect, useState } from "react";


export const AuthContext = createContext(0);

function AuthProvider({children})
{   
    const [logado, setLogado] = useState(false)
    const [error , setError] =useState(false)
    const [cadastro, setCadastro ] = useState( false );

    async function Login( email, senha)
    {
       
    if (email != "" && senha != ""){        
        await fetch ('http://10.139.75.32:5251/api/Usuarios/Login/'+email+"/"+senha,{
            method: 'GET',
            headers:{'content-type' : 'application/json'}
        })
        .then( res => (res.ok == true) ? res.json() : false)
        .then( json => {
            setLogado(( json) ? true : false);
            setError(( json) ? false : true);            
        }
     )    
    } else {
        console.log("else");
        setError(true)
    }
    
       
}


    return(
        <AuthContext.Provider value={{logado: logado, Login, error : error, cadastro: cadastro, setCadastro }}>
            {children}
        </AuthContext.Provider>
    )
    
}

export default AuthProvider;
