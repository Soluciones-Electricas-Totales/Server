const getHTMLBodySendToken = (params) => {
    return `
        <h1>Codigo de recuperación</h1>
        Utilice el siguiente codigo para restaurar su contraseña, recuerde que solo se puede usar una vez y expirará en 15 minutos.
        <div>
            ${params.token}
        </div>
`

};

export default getHTMLBodySendToken;