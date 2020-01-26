import React, { Component } from 'react';

class Counter extends Component {
    state = {
        count : 0,
        tags : [],
        out : ''
    };

    constructor(){
        super();
        this.handelRemoveAll = this.handelRemoveAll.bind(this);
    }
    styles = {
        color : 'Red'
    };

    handelRemoveAll()
    {
        console.log("Remove");
        this.state.tags = [];
        this.setState({tag : []});
    }

    handelAddOne(data)
    {
        console.log("Added" + data);
        if (typeof(data) == undefined ) 
            return <p style = {{color: 'red'}}> No data entered </p>;
        if (this.state.tags.indexOf(data) >= 0 || data.length <= 0)
            return <p style = {{color: 'red'}}> Data alred [resent] </p>;
        if (this.state.tags.indexOf(data) < 0)
        {
            let cloneTags = Array.from(this.state.tags);
            this.state.tags = cloneTags;
            this.setState({tag : cloneTags});
            cloneTags.push(data);
        }
    }

    handelRemoveOne(data){
        console.log(data);
        let cloneTags = Array.from(this.state.tags);
        this.state.tags = cloneTags;
        this.setState({tag : cloneTags});
        cloneTags.pop(data)
    }

    renderAns ()
    {
        //<h2 class = "text-center" style = {{colot : 'white',fontWeight : 'bold'}}> {out} </h2>;
        console.log(this.state.out);
        if (this.state.tags.length == 0) return ;
        return <div ><h4> You shoud Do : </h4> <h2 className = "text-center" style = {{colot : 'black',fontWeight : 'bold'}}> {this.state.out} </h2> </div>;
    }

    findAns(){
        let index = Math.floor(this.state.tags.length * Math.random());
        //console.log(index);
        let data = this.state.tags[index];
        //console.log(out)
        //this.renderAns(out);
        this.state.out = data;
        this.setState({out : data});
    }

    renderTags ()
    {
        if (this.state.tags.length === 0) return <p className = "text-center"style = {{color : 'white'}}> Please add some work </p>;
        else return <ol>
                        {this.state.tags.map(tag => <li key = {tag}>{tag} <button onClick = { () => {this.handelRemoveOne(tag);} } ref = {tag} style = {{color : 'red', width: '50%'}} class = "btn pull-right">Remove</button></li>)}
                    </ol>;
    }
    render() { 
        return ( <div style = {{backgroundColor : 'blue'}}>
                <div style = {{backgroundColor : 'black'}}>
                <h2 style = {{ color : 'Red'}} className = "text-center"> Super Decision Taker </h2>
                <h5 style = {{ color : 'white'}} className = "text-center"> Confused?? Put your choices here </h5>
                </div>
                <br></br>
                <br></br>
                <div class="row">
                    <div class="col-md-4"></div>
                    <div class="col-md-4">
                        <div style = {{backgroundColor : 'purple'}}>
                            <div class = "text-center"> 
                            <button onClick = { () => {this.findAns();} } class = "btn text-center"><h3 style = {{backgroundColor : 'lightblue'}} className = "text-center"> What should I do?? </h3> </button>
                            </div>
                            <h5 className = "text-center"> Your Options </h5>
                            <button onClick = { ()=>{this.handelRemoveAll();}} className = "text-center"> Remove all</button>
                            {this.renderTags()}
                            <div class = "row">
                                <div class = "col-md-9">
                                <input ref = "work" type = "text" placeholder = "Enter your work" style = {{borderRadius : "10px",backgroundColor: 'Yellow',width : "100%"}}/>
                                </div>
                                <div class = "col-md-3">
                                <button onClick = { () =>{this.handelAddOne(this.refs.work.value);}} className = "text-center btn btn-primary"> Add element</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4"></div>
                    
                </div>
                <div className = "text-center">
                    {this.renderAns()}
                </div>
                </div>);
    }
}
 
export default Counter;