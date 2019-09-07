import React, { Component } from 'react';
import {Container,Card,Button,Form, CardColumns, ButtonGroup} from 'react-bootstrap';
import { connect } from 'react-redux';
import { setIssue,setIssueAdd } from '../actions';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import MarkdownShortcuts from '../components/slate/markdown-shortcuts'
let initialJson = {
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: '真是开心啊',
              },
            ],
          },
        ],
      },
    ],
  },
}
const initialValue = Value.fromJSON(initialJson)
class Edit extends Component {
  constructor(props){
    super(props)
    //console.log(props)
    let params = props.match.params
    let number = params.number?params.number:"new"
    /* q = d - 1324 * 24 * 60 * 60  
    *  1443365529298 是第一天
    *  Sun Sep 27 2015 22:52:09 GMT+0800 (中国标准时间)
    */
    let now = new Date()
    let show_day = ["星期天","星期一","星期二","星期三","星期四","星期五","星期六"]
    let manyDay = Math.floor((now - 1443365529298)/(24 * 60 * 60 * 1000)) + 1// 往下 取整
    let day = now.getDay()
    let title = `传说之旅${manyDay} ${show_day[day]}`
    //let content = "今天发生了什么愉快的事情呢？"
    this.state = {msg:"msg hhh",number,title,value:initialValue}
  }  
  componentDidMount () {
    let setIssue = this.props.setIssue
    let number = this.state.number
    if(number === "new"){
      let title = localStorage.getItem('title')
      let content = localStorage.getItem('conent')
      if(title){
        this.setState({title})
      }
      if(content){
        this.setState({content})
      }
    }else{
      setIssue({number}) // number first after 后面两个是评论的
    }
    console.log("Edit初始化",number)
    
  }
  handleClick(){
    this.setState({
      msg:"msg修改"
    })
    //console.log(this)
  }
  getType = chars => {
    switch (chars) {
      case '*':
      case '-':
      case '+':
        return 'list-item'
      case '>':
        return 'block-quote'
      case '#':
        return 'heading-one'
      case '##':
        return 'heading-two'
      case '###':
        return 'heading-three'
      case '####':
        return 'heading-four'
      case '#####':
        return 'heading-five'
      case '######':
        return 'heading-six'
      default:
        return null
    }
  }
  onChangeTitle = (e)=>{
    let title = e.target.value
    if (title !== this.state.title) {
      localStorage.setItem('title', title)
    }
    this.setState({
      title
    })
  }
  onValueChange = ({value}) =>{
    // Check to see if the document has changed before saving.
    if (value.document !== this.state.value.document) {
      const content = JSON.stringify(value.toJSON())
      localStorage.setItem('content', content)
      // console.log(content)
    }
    this.setState({value})
    // console.log(this.state)
  }
  onClickAddNewPost = ()=>{
    const { setIssueAdd } = this.props
    // 1. 获取actions 2. 执行提交内容
    const content = JSON.stringify(this.state.value.document)
    const nodes = JSON.parse(content)
    // console.log(content,nodes)
    let values = nodes.nodes.map((item,index)=>item.nodes[0].text)
    let value = values.join("\\r\\n")
    let title = this.state.title
    let data = {content:value,title:title}
    //console.log(value)
    setIssueAdd(data)
    localStorage.removeItem('title')
    localStorage.removeItem('content')
  }
  render() {
    let CardIssue
    let ButtonSubmit = <Button onClick = {(e)=>this.onClickAddNewPost(e)}>增加</Button>
    if(this.props.state.setIssue.issue){
      let issue = this.props.state.setIssue.issue
      // 赋值给state
    }else{
      CardIssue = (<Card>等等</Card>)
    }
    return (  
        <Container className="xx-space-Edit">
          <Card>
            <Card className="Edit-content">
              <Card.Header><Form.Control type="text" onChange = {(e)=>this.onChangeTitle(e)} placeholder="题目" defaultValue={this.state.title} /></Card.Header>
              <Card.Title>{this.state.createdAt||new Date().toLocaleString()}</Card.Title>
              <Card.Body>
                <Editor 
                  placeholder = "hhh"
                  value = {this.state.value}
                  onChange = {this.onValueChange}
                  />
                {/* <Editor
                  placeholder = "打算放预览的地方啦"
                  value = { this.state.value }
                  onKeyDown={this.onKeyDown}
                  renderBlock={this.renderBlock}
                /> */}
              </Card.Body> 
              {/* <MarkdownShortcuts/> */}
              <Card.Footer>
                <Card>
                  <ButtonGroup>
                    {ButtonSubmit}
                  </ButtonGroup>
                </Card>
              </Card.Footer>
            </Card>
          </Card>
        </Container>
    );
  }
    /**
   * Render a Slate block.
   *
   * @param {Object} props
   * @param {Editor} editor
   * @param {Function} next
   * @return {Element}
   */

  renderBlock = (props, editor, next) => {
    const { attributes, children, node } = props

    switch (node.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>
      case 'heading-three':
        return <h3 {...attributes}>{children}</h3>
      case 'heading-four':
        return <h4 {...attributes}>{children}</h4>
      case 'heading-five':
        return <h5 {...attributes}>{children}</h5>
      case 'heading-six':
        return <h6 {...attributes}>{children}</h6>
      case 'list-item':
        return <li {...attributes}>{children}</li>
      default:
        return next()
    }
  }

  /**
   * On key down, check for our specific key shortcuts.
   *
   * @param {Event} event
   * @param {Editor} editor
   * @param {Function} next
   */

  onKeyDown = (event, editor, next) => {
    switch (event.key) {
      case ' ':
        return this.onSpace(event, editor, next)
      case 'Backspace':
        return this.onBackspace(event, editor, next)
      case 'Enter':
        return this.onEnter(event, editor, next)
      default:
        return next()
    }
  }

  /**
   * On space, if it was after an auto-markdown shortcut, convert the current
   * node into the shortcut's corresponding type.
   *
   * @param {Event} event
   * @param {Editor} editor
   * @param {Function} next
   */

  onSpace = (event, editor, next) => {
    const { value } = editor
    const { selection } = value
    if (selection.isExpanded) return next()

    const { startBlock } = value
    const { start } = selection
    const chars = startBlock.text.slice(0, start.offset).replace(/\s*/g, '')
    const type = this.getType(chars)
    if (!type) return next()
    if (type === 'list-item' && startBlock.type === 'list-item') return next()
    event.preventDefault()

    editor.setBlocks(type)

    if (type === 'list-item') {
      editor.wrapBlock('bulleted-list')
    }

    editor.moveFocusToStartOfNode(startBlock).delete()
  }

  /**
   * On backspace, if at the start of a non-paragraph, convert it back into a
   * paragraph node.
   *
   * @param {Event} event
   * @param {Editor} editor
   * @param {Function} next
   */

  onBackspace = (event, editor, next) => {
    const { value } = editor
    const { selection } = value
    if (selection.isExpanded) return next()
    if (selection.start.offset !== 0) return next()

    const { startBlock } = value
    if (startBlock.type === 'paragraph') return next()

    event.preventDefault()
    editor.setBlocks('paragraph')

    if (startBlock.type === 'list-item') {
      editor.unwrapBlock('bulleted-list')
    }
  }

  /**
   * On return, if at the end of a node type that should not be extended,
   * create a new paragraph below it.
   *
   * @param {Event} event
   * @param {Editor} editor
   * @param {Function} next
   */

  onEnter = (event, editor, next) => {
    const { value } = editor
    const { selection } = value
    const { start, end, isExpanded } = selection
    if (isExpanded) return next()

    const { startBlock } = value
    if (start.offset === 0 && startBlock.text.length === 0)
      return this.onBackspace(event, editor, next)
    if (end.offset !== startBlock.text.length) return next()

    if (
      startBlock.type !== 'heading-one' &&
      startBlock.type !== 'heading-two' &&
      startBlock.type !== 'heading-three' &&
      startBlock.type !== 'heading-four' &&
      startBlock.type !== 'heading-five' &&
      startBlock.type !== 'heading-six' &&
      startBlock.type !== 'block-quote'
    ) {
      return next()
    }

    event.preventDefault()
    editor.splitBlock().setBlocks('paragraph')
  }
}

// mapStateToProps：将state映射到组件的props中
const mapStateToProps = (state) => {
  console.log("state 映射",state)
  return {
      state
  }
}
// mapDispatchToProps：将dispatch映射到组件的props中
const mapDispatchToProps = (dispatch, ownProps) => {
return {
  setIssue(data){
    dispatch(setIssue(data))
  },
  setIssueAdd(data){
    dispatch(setIssueAdd(data))
  }
}
}
export default connect(mapStateToProps, mapDispatchToProps)(Edit)
//export default Edit;
