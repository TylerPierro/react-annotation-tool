import React, {Component} from 'react';
import Duration from '../player/Duration'
import Integer from './Integer'
import 'bootstrap/dist/css/bootstrap.css';
import { Button, ButtonGroup, ListGroup, ListGroupItem, Collapse} from 'reactstrap';
import { Events, scrollSpy, scroller} from 'react-scroll'
import MdCallSplit from 'react-icons/lib/md/call-split';
import MdDelete from 'react-icons/lib/md/delete';
import MdAdd from 'react-icons/lib/md/add';
import MdHighlightRemove from 'react-icons/lib/md/highlight-remove';
import FaChevronDown from 'react-icons/lib/fa/chevron-down';
import FaChevronUp from 'react-icons/lib/fa/chevron-up';
import IoEyeDisabled from 'react-icons/lib/io/eye-disabled';
import IoEye from 'react-icons/lib/io/eye';
import FaArrowDown from 'react-icons/lib/fa/arrow-down';


import {SPLIT, HIDE, SHOW} from '../../models/2DVideo.js';
import './List.css';

class List extends Component {

	constructor(props){
		super(props)
		this.state = {collapses: {}}
	}

	componentDidMount = () =>{
    Events.scrollEvent.register('begin', (to, element) => {});
    Events.scrollEvent.register('end', (to, element) => {});
    scrollSpy.update();
  }
	componentWillUnmount = () =>{
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }
	componentDidUpdate = (prevProps) => {
		const { focusing } = this.props;
		// Typical usage (don't forget to compare props):
	  if ( focusing && focusing !== prevProps.focusing) {
	    scroller.scrollTo(focusing, {containerId: 'list-wrapper'});
	  }
		//
  }

	componentWillReceiveProps(nextProps) {
		const objects = nextProps.objects
		this.setState((prevState, props) => {
			let collapses = prevState.collapses;
			let newCollapses = {}
			for( let obj of objects ){
				if(collapses.hasOwnProperty(obj.name)){
					newCollapses[obj.name] = collapses[obj.name];
					continue;
				}
				newCollapses[obj.name] = false;
			};
			return {collapses: newCollapses}
		})
	}
	handleObjectItemClick = (name) =>{
		this.props.onListObjectItemClick(name)
	}
	handleDelete = (name) => {
    this.props.onListObjectDelete(name);
  }
	handleSplit = (name) => {
    this.props.onListObjectSplit(name);
  }
	handleShowHide = (e) => {
    this.props.onListObjectShowHide(e);
  }
	handleTrajectoryJump = (e) => {
		this.props.onListTrajectoryJump(e);
	}
	handleTrajectoryDelete = (e) => {
		this.props.onListTrajectoryDelete(e);
	}
	handleToggle = (e) => {
		this.setState((prevState, props) => {
			let toggle = !prevState.collapses[e]
			return {collapses: {...prevState.collapses, [e]: toggle }}
		})
	}
  render() {
		const { objects, duration, played, focusing, height } = this.props;
		const { collapses } = this.state;
		const items = [];

		objects.forEach( obj =>{
			let trajectories = obj.trajectories;
			let trajectoryItems = []
			let split, show, hide;
			show = <Button outline className="d-flex align-items-center object-item-button" onClick={()=>this.handleShowHide({name: obj.name, status: SHOW})}><IoEye /> {SHOW} this box</Button>
			for( let i=0; i<trajectories.length; i++){
				let trajectoryStyle = {}
				if(trajectories[i].time === played )
					trajectoryStyle.color = "rgb(33, 37, 41)";
				trajectoryItems.push(<ListGroupItem key={trajectories[i].time} className="trajectory-item">
															<Button className="trajectory" style={trajectoryStyle} color="link" onClick={()=>this.handleTrajectoryJump({name: obj.name, time: trajectories[i].time})}>
																<span className="trajectory-status"><b>{trajectories[i].status}</b> at <Duration seconds={duration*trajectories[i].time}/></span>
																<span className="trajectory-size"><b>Size</b> <Integer number={trajectories[i].width} /> x <Integer number={trajectories[i].height} /></span>
																<span className="trajectory-position"><b>Position</b> <Integer number={trajectories[i].x} />, <Integer number={trajectories[i].y} /></span>
															</Button>
															<Button className="trajectory-delete" color="link" onClick={()=>this.handleTrajectoryDelete({name: obj.name, time: trajectories[i].time})}><MdDelete /></Button>
														</ListGroupItem>)
				let angle;
				//if(i!=trajectories.length-1){
					if( i!==trajectories.length-1 && played > trajectories[i].time && played < trajectories[i+1].time)
						angle = <ListGroupItem key={trajectories[i].time+1} className="trajectory-item"><FaArrowDown style={{color: "", fontSize: "1em"}} /></ListGroupItem>
					else if( i===trajectories.length-1 && played > trajectories[i].time)
						angle = <ListGroupItem key={trajectories[i].time+1} className="trajectory-item"><FaArrowDown style={{color: "", fontSize: "1em"}} /></ListGroupItem>
					else if( i!==trajectories.length-1 && played === trajectories[i+1].time)
						angle = <ListGroupItem key={trajectories[i].time+1} className="trajectory-item"><FaArrowDown style={{color: "", fontSize: "1em"}} /></ListGroupItem>
					else//( i==trajectories.length-1 && played <= trajectories[i].time)
						angle = ""
					//else
					//	angle = <ListGroupItem key={trajectories[i].time+1} className="trajectory-item"><FaAngleDown style={{color: "#a2b0bc", fontSize: "2em"}} /></ListGroupItem>
				//}
				trajectoryItems.push(angle)
				if(played >= trajectories[i].time){
					if(i!==trajectories.length-1 && played >= trajectories[i+1].time)
						continue;
					if(trajectories[i].status === SHOW){
						hide = <Button outline className="d-flex align-items-center object-item-button" onClick={()=>this.handleShowHide({name: obj.name, status: HIDE})}><IoEyeDisabled /> {HIDE} this box</Button>
						split = <Button outline className="d-flex align-items-center object-item-button" onClick={()=>this.handleSplit(obj.name)}><MdCallSplit/> {SPLIT} this box</Button>
						show = ""
					}
					if(trajectories[i].status === SPLIT )
						show = ""
				}
      }
			let parent = objects.find( o => { return o.name === obj.parent });
			let children = objects.filter(o=>{ for( let child of obj.children ) if(child === o.name) return true; return false;})
			children = children.map(child=><span key={child.name} onClick={()=>this.handleObjectItemClick(child.name)}> Box {child.id}</span>)
			if(obj.name === focusing)
				items.unshift(<ListGroupItem className="object-item object-item-highlight" key={obj.name} name={obj.name} style={{borderColor: obj.color.replace(/,1\)/, ",.3)")}}>
														 <div className="d-flex align-items-center">
																<h5 className="object-item-title mr-auto">Box {obj.id}</h5>
																{split}
																{hide}
																{show}
																<Button className="d-flex align-items-center object-item-delete" color="link" onClick={()=>this.handleDelete(obj.name)}><MdDelete/></Button>
															</div>
															<div>{parent? <div>Parent is <span onClick={()=>this.handleObjectItemClick(parent.name)}>Box {parent.id}</span></div>: '' }</div>
															<div>{children.length>0? <div>Children are {children}</div>: "" }</div>
															<div className="trajectories-toggle" color="link" onClick={()=>this.handleToggle(obj.name)} style={{ marginBottom: '0rem' }}>
																<span className="font-weight-bold">Trajectories</span> { collapses[obj.name]?<FaChevronUp style={{marginBottom: "5px"}}/>:<FaChevronDown style={{marginBottom: "5px"}}/>}
															</div>
															<Collapse isOpen={collapses[obj.name]}>
																<ListGroup className="py-2 text-center trajectory-wrapper">{trajectoryItems}</ListGroup>
															</Collapse>
											</ListGroupItem>)
			else
				items.unshift(<ListGroupItem className="object-item" key={obj.name} name={obj.name} onClick={()=>this.handleObjectItemClick(obj.name)} action>
													 <div className="d-flex w-100 justify-content-between align-items-center">
															<div>Box {obj.id}</div>
													 </div>
										  </ListGroupItem>)
		})
		if(items.length ==0)
			return (<div className="d-flex align-items-center justify-content-center"  style={{height: height-60}}>Use <Button disabled outline color="primary" onClick={this.handleAddObject} className="d-flex align-items-center explanation-add-button"><MdAdd/> Add Box</Button> button above to add a box for annotating cells on the video </div>)
    return (
			<ListGroup className="list-wrapper" id="list-wrapper" style={{maxHeight: height-60}}>{items}</ListGroup>
    );
  }
}
export default List;