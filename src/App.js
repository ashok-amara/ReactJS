import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import { tsConstructorType } from '@babel/types';
import Person from './Person/Person';

let empname="",contact=0,i=3;
class CRUD extends React.Component
{
    constructor()
    {
        super();
        this.state={
            edit_det:false,
            emp_det:[
                {
                    empid:"E001",
                    name:"Ramesh",
                    contactno:225588
                },
                {
                    empid:"E002",
                    name:"Arvind",
                    contactno:245895
                },
                {
                    empid:"E003",
                    name:"Zaseem",
                    contactno:267485
                }
            ]
        }
        this.AcceptEmpName=this.AcceptEmpName.bind(this);        
        this.AcceptContactno=this.AcceptContactno.bind(this);
        this.ButtonInsertHandler=this.ButtonInsertHandler.bind(this);
        this.EditHandler=this.EditHandler.bind(this);
        this.ButtonUpdateHandler=this.ButtonUpdateHandler.bind(this);
        this.DeleteEmpDetail=this.DeleteEmpDetail.bind(this);
    }
    AcceptEmpName(e)
    {
        empname=e.target.value;
    }
    AcceptContactno(e)
    {
        contact=e.target.value;
    }
    ButtonInsertHandler()
    {
        if(empname!="" || contact!=0)
        {
            i++;
            this.setState({emp_det: [...this.state.emp_det,{empid:"E00"+i,name:empname,contactno:contact}]});
            ReactDOM.findDOMNode(this.refs.inp1).value="";
            ReactDOM.findDOMNode(this.refs.inp2).value="";

            empname="";
            contact=0;
        }
    }
    EditHandler(id,nm,cno)
    {
        this.setState({edit:true,empid:id,name:nm,contactno:cno});
    }
    ButtonUpdateHandler()
    {
        this.setState({emp_det:this.state.emp_det.map(val => 
        {       
            if (val.empid === this.state.id)
            {  
                val['name'] =this.state.name;
                val['contactno']=this.state.contactno;         
                return val;        
            }
            return val;      
        })   });
        this.setState({edit_det:true});


    }
    DisplayEditForm()
    {
        if(this.state.edit)
        {
            return <form>
                <b>Name: </b>
                <input type="text" defaultValue={this.state.name}/>
                <b>Contact No: </b>
                <input type="text" defaultValue={this.state.contactno}/>
                <button type="button" onClick={this.ButtonUpdateHandler}>Update</button>
            </form>
        }
    }
    DeleteEmpDetail(id)
    {
        this.setState({emp_det:this.state.emp_det.filter(val=>val.empid!=id)});
    }
    
    render()
    {
        return(<div>
            {this.DisplayEditForm()}
            <form>
              <b>Enter Emp Name: </b>
              <input type="text" ref="inp1" onBlur={this.AcceptEmpName}/>&nbsp;&nbsp;
              <b>Enter Contact no: </b>
              <input type="text" ref="inp2" onBlur={this.AcceptContactno}/>&nbsp;&nbsp;
              <button type="button" onClick={this.ButtonInsertHandler}>Insert</button>    
            </form>
           {this.state.emp_det.map(val=>
            <div>
             <br/>   
            <div><b>{val.empid}</b>&nbsp;&nbsp;
                <b>{val.name}</b>&nbsp;&nbsp;
                <b>{val.contactno}</b>&nbsp;&nbsp;
            <button type="button" onClick={()=>this.EditHandler(val.empid,val.name,val.contactno)}>Edit</button>
            <button type="button" onClick={()=>this.DeleteEmpDetail(val.empid)}>Delete</button>
            <button type="button">Complete</button>
            </div>
            </div>
            )}
            <Person></Person>
        </div>);
    }
}
export default CRUD;