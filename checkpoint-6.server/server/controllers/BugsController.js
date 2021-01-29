import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugService } from '../services/BugService'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
    // .get('', this.getAll)
    // .get('/:id', this.getOne)
      .post('', this.create)
    // .put('/:id', this.edit)
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await bugService.create(req.body))
    } catch (error) {
      next(error)
    }
  }
}
