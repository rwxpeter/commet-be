import { HttpResponse, Controller } from '@/presentation/protocols'
import { AddCommentService } from '@/services/comments/add-comment-service'
import { makeBadRequest, makeServerError, makeOk } from '@/utils/http'

export class AddCommentController implements Controller {
  private readonly service: AddCommentService

  constructor (service: AddCommentService) {
    if (service === null) {
      throw new Error('Missing dependency of type AddCommentService')
    }

    this.service = service
  }

  async handle (request: AddCommentController.Request): Promise<HttpResponse> {
    const { discussionId, parentId, markdown, ownerId } = request
    try {
      const commentId = await this.service.handle({discussionId, parentId, markdown, ownerId})
      if(!commentId) {
        return makeBadRequest('Unable to create comment')
      }
      return makeOk(commentId)
    }
    catch(error) {
      return makeServerError(error)
    }
  }
}

export namespace AddCommentController {
  export type Request = {
    discussionId: string
    parentId: string
    markdown: string
    ownerId: string
  }
}
