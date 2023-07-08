import layout from '../layout.js'
import { getError } from '../../helpers.js'

const signupTemplate = ({ req, errors }) => {
    return layout({ 
        content: `
            <div>
                ID is: ${req.session.userId}
                <form method='POST'>
                    <input name='email' placeholder='email'/>
                    ${getError(errors, 'email')}
                    <input name='password' placeholder='password'/>
                    ${getError(errors, 'password')}
                    <input name='passwordConfirmation' placeholder='re-enter password'/>
                    ${getError(errors, 'passwordConfirmation')}
                    <button>Submit</button>
                </form>
            </div>
        `
    });
}

export default signupTemplate;