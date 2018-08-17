import config from '../config'

const argExp = /:\w+/g

export default class RoutePath {

    constructor({path, exact, component, auth, admin = false}) {
        this.realPath = path
        this.path = path.split('?')[0]
        this.exact = exact
        this.args = this.realPath.match(argExp)
        if (this.args == null) {
            this.args = []
        }
        this.component = component
        this.auth = auth
        this.requiresAdmin = admin
    }

    get(options) {
        const args = this.args.map(arg => {
            let argName = arg.substring(1)
            if (options[argName] !== undefined) {
                return options[argName]
            } else {
                return ''
            }
        })
        return config.route(this.realPath.split(argExp).reduce((acc, current, i) => {
            if (i <= args.length) {
                return acc + args[i - 1] + current
            } else {
                return acc + current
            }
        }))
    }
}
