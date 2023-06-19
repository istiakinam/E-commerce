const signupTemplate = ({ req }) => {
    return `
        <div>
            ID is: ${req.session.userId}
            <form method='POST'>
                <input name='email' placeholder='email'/>
                <input name='password' placeholder='password'/>
                <input name='passwordConfirmation' placeholder='re-enter password'/>
                <button>Submit</button>
            </form>
        </div>
    `
}

export default signupTemplate;