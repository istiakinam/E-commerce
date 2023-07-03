import layout from '../layout.js'

const signupTemplate = ({ req }) => {
    return layout({ 
        content: `
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
    });
}

export default signupTemplate;