import React from 'react'
import axios from '../config/axios'

class EditUser extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user:{},
            username:{},
            phone:'',
            id:'',
            errors:{
                username:'',
                phone:''
            },
            
        }
    }
    componentDidMount(){
        console.log('component did mount')
        const token = localStorage.getItem('auth-token')
        if( token && localStorage.getItem('auth-login')){
            axios.get(`/users/show`,{
                headers:{
                    Authorization:token
                }
            })
                .then(response=>{
                    console.log(response.data)
                    this.setState({user:response.data, username:response.data.username, phone:response.data.phone})
                     
                })
                .catch(err=>{
                    console.log(err)
                    this.props.history.push('/SignIn')
                })
            
        }else{
            this.props.history.push('/SignIn')
        }

    }
    handleChange=(e)=>{
        const { name, value } = e.target
        console.log(name, value)
        let errors = this.state.errors;
        switch (name) {
            case 'username': 
                errors.username = 
                isNaN(value) 
                    ?   value.length < 5 ? 'Name must be 5 characters long!' : ''
                    : 'Name must be string'
                break;
            case 'phone': 
                errors.phone = 
                isNaN(value) 
                    ? 'mobile must number!'
                    : value.length < 10 || value.length > 10 ? 'mobile must 10 digit!' : ''
                break;
            default:
                break;
        }
        this.setState({errors, [name]: value});
    
        
    }
 
    handleSubmit=(e)=>{
        e.preventDefault()
        console.log(this.state)
        let valid
        if(this.state.username && this.state.phone){
            valid = true
        }
        const errors= this.state.errors
        Object.values(errors).forEach(
            (val) => val.length > 0 && (valid = false)
        )
        if(valid){
            const user = {username:this.state.username, phone:this.state.phone}
            const id = this.state.user._id 
            const token = localStorage.getItem('auth-token')
            axios.put(`/users/update/${id}`,user,{
                headers:{
                    Authorization:token
                }
            })
                .then(response=>{
                    console.log('updated',response.data)
                    if(response.data._id){
                        this.props.history.push('/Users')
                    }else{
                        let errors = this.state.errors
                        errors.login =  response.data
                        this.setState({errors})
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
        }
 
    }
    render(){
        console.log('rendered', this.state.username, this.state.phone)
        return(
            <div>
                <h3>Add New Quote </h3>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>
                            UserName
                            <br/>
                            <textarea rows={1} cols={20} value={this.state.username} onChange={this.handleChange} name='username'></textarea>
                        </label>
                        <br/>
                        <span style={{ color: 'red' }}>{this.state.errors.username}</span>
                    </div>
                    <br/>
                    <div>
                        <label>
                            Phone
                            <br/>
                            <textarea rows={1} cols={20} value={this.state.phone} onChange={this.handleChange} name='phone'></textarea>
                        </label>
                        <br/>
                        <span style={{ color: 'red' }}>{this.state.errors.phone}</span>
                    </div>
                    <br/>
                
                    <input type="submit" value="Submit"/>
                    
                </form>
               
            </div>
            
        )
    }
    

}

export default EditUser