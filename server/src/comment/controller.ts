import { JsonController, Get, Param, Body, Post, HttpCode, Authorized } from 'routing-controllers'
import Comment from './entity'


@JsonController()
export default class CommentController {

    @Get('/comments')
    async allComments() {
        const comments = await Comment.find()
        return { comments }
    } //test: http :4000/comments

    @Get('/comments/:id')
    getComment(
        @Param('id') id: number
    ) {
        return Comment.findOne(id)
    }  // test: http :4000/comments/1  
     

    @Authorized()
    @Post('/comments/:id')
    @HttpCode(201)
        createComment(
        @Body() comment: Comment,
        @Param('id') id: number
        ) {
            comment.ticket = id;
            return comment.save()
        }  //test: http post :4000/comments content='nicest festival ever, also trusted  seller' author='rodrigo' tickets_id=8
}


