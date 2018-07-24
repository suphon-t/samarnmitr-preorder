import config from '../config'

const argExp = /:\w+/g

export default class RoutePath {

    constructor({path, exact, component}) {
        this.path = path
        this.exact = exact
        this.args = this.path.match(argExp)
        if (this.args == null) {
            this.args = []
        }
        this.component = component
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
        return config.route(this.path.split(argExp).reduce((acc, arg, i) => {
            if (i < args.length) {
                acc += args[i]
                return acc + arg + args[i]
            } else {
                return acc + arg
            }
        }))
    }
}
