import React, { Component } from 'react';
import {Container,Card,Button,Form, ButtonGroup, Badge} from 'react-bootstrap';
import { connect } from 'react-redux';
import { setIssueEdit } from '../actions';
import { Editor } from 'slate-react';
// import { Value } from 'slate';
import Head from '../components/head/head'
import Plain from 'slate-plain-serializer'
import {ADD_ISSUE,GET_LABELS,GET_ISSUE,UPDATE_ISSUE} from "../graphql"

// const initialValue = Value.fromJSON(initialJson)
class Edit extends Component {
  constructor(props){
    super(props)
    // console.log("props:",props)
    let params = props.match.params
    let number = params.number?params.number:"new"
    //let content = "今天发生了什么愉快的事情呢？"
    this.state = {
      msg:"msg hhh",
      number,
      // title,
      // value:initialValue,
      value: Plain.deserialize("真是开心啊"),
      createdAt: new Date().toLocaleString(),
      titleStyle:{
        color: '#cccccc',
        fontSize: 10
      },
      labelEdges: [],
      issue:{
        labels:{
          edges:[]
        }
      }
    }
  }  
  componentDidMount () {
    // 获取Labels
    let client = this.props.state.setConfig.client
    let cg = this.props.state.setConfig.config
    client.query({
      query: GET_LABELS, 
      variables: { owner: cg.owner, name: cg.name, first:100},    
      }).then(res=>{
          let labelEdges = res.data.repository.labels.edges
          // console.log("res",labelEdges)
          this.setState({labelEdges})

    })
    let setIssueEdit = this.props.setIssueEdit
    let number = this.state.number
    setIssueEdit()
    if(number === "new"){
      /* q = d - 1324 * 24 * 60 * 60  
      *  1443365529298 是第一天
      *  Sun Sep 27 2015 22:52:09 GMT+0800 (中国标准时间)
      */
      let now = new Date()
      let show_day = ["星期天","星期一","星期二","星期三","星期四","星期五","星期六"]
      let manyDay = Math.floor((now - 1443365529298)/(24 * 60 * 60 * 1000)) + 1// 往下 取整
      let day = now.getDay()
      let title = `奇幻旅程${manyDay} ${show_day[day]}`
      // 如果新建文章的情况下，如果本地已经有了的话，直接设置
      title = localStorage.getItem('title')?localStorage.getItem('title'):title
      let content = localStorage.getItem('content')?localStorage.getItem('content'):"真是开心啊"
      this.setState({title,value: Plain.deserialize(content)})
    }else{
      // setIssueEdit({number}) // number first after 后面两个是评论的
      // console.log("number",number,typeof number)
      // 获取具体的某一个issue的内容
      client.query({
        query: GET_ISSUE,
        variables:{
          owner:cg.owner,
          name: cg.name,
          number: parseInt(number),
          first: 100,
          after: null
        }
      }).then(res=>{
        // console.log("get issue",res.data)
        let issue = res.data.repository.issue
        let labelEdges = issue.labels.edges
        let issueLables = labelEdges.map(item=>item.node.name)
        this.setState({
          isUpdate: true,
          issue:issue,
          // issueId: issue.id,
          issueLables: issueLables,
          // issueCreatedAt: issue.createdAt,
          // issueBody: issue.body,
          // issueNumber: issue.number,
          // issueTitle: issue.title,
          issueState: "OPEN",
          title: issue.title,
          value: Plain.deserialize(issue.body),
        })
        let le = this.state.labelEdges
        le.map(item=>{
          // console.log(item.node.name,issueLables)
          if(issueLables.includes(item.node.name) ){
            // console.log(item.node.name,issueLables,"IN")            
            item.node.checked = true
            item.node.isChecked = true
          }
          return item
        })
        this.setState({
          labelEdges:le
        })
      })
    }
    // console.log("Edit初始化",number,this.props)


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
      // const content = JSON.stringify(value.toJSON())
      // localStorage.setItem('content', content)
      localStorage.setItem('content', Plain.serialize(value))
      // console.log(content)
    }
    this.setState({value})
    // console.log(this.state)
  }
  onClickAddNewPost = ()=>{
    const { client,config } = this.props.state.setConfig
    // COMPLETED: 1. 获取actions 2. 执行提交内容
    // const value = JSON.stringify(this.state.value.document)
    let value = Plain.serialize(this.state.value)
    let title = this.state.title
    let labelIds= this.state.labelEdges.map(item=>{
      if(item.node.isChecked){
        return item.node.id
      }else{
        return null
      }
    })
    labelIds = labelIds.filter(function(x){return x!==null})
    let variables = {repositoryId:config.repositoryId,labelIds,body:value,title}
    // console.log(value,labelIds,variables)
    // PRETODO: 获取lables和设置lables，获取仓库ID
    client.mutate({
          mutation : ADD_ISSUE,
          variables
      }).then(res=>{
        // console.log("res结果",res)
        // this.props.history.push("/")
        // window.location.href="/"
        this.props.history.push("/")
      })
    localStorage.removeItem('title')
    localStorage.removeItem('content')
  }
  onClickEditOldPost = () => {
    const { client } = this.props.state.setConfig
    let value = Plain.serialize(this.state.value)
    let title = this.state.title
    let state = this.state.issueState
    let labelIds= this.state.labelEdges.map(item=>{
      if(item.node.isChecked){
        return item.node.id
      }else{
        return null
      }
    })
    labelIds = labelIds.filter(function(x){return x!==null})
    let variables = {id:this.state.issue.id,state,labelIds,body:value,title}
    console.log(value,labelIds,variables,typeof this.state.issue.id)
    // PRETODO: 获取lables和设置lables，获取仓库ID
    client.mutate({
          mutation : UPDATE_ISSUE,
          variables
      }).then(res=>{
        // console.log("res结果",res)
        this.props.history.push("/")
      })
    localStorage.removeItem('title')
    localStorage.removeItem('content')
  }
  onClickReturn = ()=>{
    this.props.history.push("/")
  }
  onShowCheckbox=(e)=>{
    // console.log("e.target.data",e.target.value,e.target,e.target.checked,this.state.labelEdges)
    let isChecked = e.target.checked
    let value = e.target.value
    let labelEdges = this.state.labelEdges
    if(isChecked){
      labelEdges[value].node.isChecked=true
    }else{
      labelEdges[value].node.isChecked=false
    }
    this.setState({labelEdges})
    console.log("this.labels",this.state.labelEdges)
  }
  render() {
    // console.log("this.props",this.props)
    let ButtonSubmit = <Button onClick = {(e)=>this.onClickAddNewPost(e)}>增加</Button>
    let ButtonReturn = <Button variant="dark" onClick = {(e)=>this.onClickReturn(e)}>返回</Button>
    let CardTitle = <Card border="light" style={this.state.titleStyle}>{this.state.createdAt}</Card>
    let EditorContent = (
      <Editor 
      placeholder = "编辑的内容"
      value = {this.state.value}
      onChange = {this.onValueChange}
      />
    )
    let CheckLable = this.state.labelEdges.map((item,index)=>{
      return (<Form.Check 
            key={item.node.id}
            type="checkbox"
            name="check-labels"
            label={item.node.name}
            value={index}
            onChange={e=>this.onShowCheckbox(e)}
            hidden={item.node.hidden}
            defaultChecked={item.node.checked}
      /> )
    })
    if(this.state.isUpdate){
      // TODO: 编辑确定，更新内容
      ButtonSubmit = <Button onClick = {(e)=>this.onClickEditOldPost(e)}>更新</Button>
      CardTitle = <Card.Title style={this.state.titleStyle}>{new Date(this.state.issue.createdAt).toLocaleString()}</Card.Title>
    }
    // console.log("this.state.data",this.state)
    return (  
        <Container className="xx-space-edit">
        <Head {...this.props}/>
          <Card>
            <Card className="edit-content">
              <Card.Header><Form.Control type="text" onChange = {(e)=>this.onChangeTitle(e)} placeholder="标题" defaultValue={this.state.title} /></Card.Header>
              <div>
              {
                this.state.issue.labels.edges.map(item=>
                  <Badge pill  style={{backgroundColor:"#"+item.node.color }} id={item.node.id} key={item.node.id} title={item.node.description}>
                      {item.node.name} 
                  </Badge>) 
              }
              </div>
              <Card.Body>
              <Card className="edit-wrapper" border="light">
                <Card className="edit" border="light" >
                  { EditorContent }
                </Card>
                <Card className="edit-aside" border="light" >
                  {CardTitle}
                  <div style={{marginTop: 20}} title="要点两下">
                  {CheckLable}
                  </div>
                </Card>
              </Card> 
                </Card.Body>
              <Card.Footer>
                <Card>
                  <ButtonGroup>
                    {ButtonSubmit}
                    {ButtonReturn}
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
  if(state.setIssue.data !== undefined){
    window.location.href = "/"
    // console.log("setIssue data", state.setIssue.data)
  }
  return {
      state
  }
}
// mapDispatchToProps：将dispatch映射到组件的props中
const mapDispatchToProps = (dispatch, ownProps) => {
return {
  setIssueEdit(data){
    dispatch(setIssueEdit(data))
  }
}
}
export default connect(mapStateToProps, mapDispatchToProps)(Edit)
//export default Edit;
