import { JsonController, Get, Param, Body, Post, HttpCode } from 'routing-controllers'
import Comment from './entity'


@JsonController()
export default class CommentController {

    // endpoint that returns all the comments 
    @Get('/comments')
    async allComments() {
        const comments = await Comment.find()
        return { comments }
    } //test: http :4000/comments

    // finds comment by id
    @Get('/comments/:id')
    getComment(
        @Param('id') id: number
    ) {
        return Comment.findOne(id)
    }  // test: http :4000/comments/1  
     

    // creates a new comment 
    //@Authorized
    @Post('/comments')
    @HttpCode(201)
        createComment(
        @Body() comment: Comment
        ) {
            return comment.save()
        }  //tested: http post :4000/comments content='nicest festival ever, also trusted  seller' author='rodrigo' tickets_id=8
             // ticket id nao atualiza na db


}


