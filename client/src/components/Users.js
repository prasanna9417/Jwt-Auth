import React from 'react'
import {Link} from 'react-router-dom'
import axios from '../config/axios'

class Users extends React.Component{
    constructor(){
        super()
        this.state={
            users:[],
            id:''
        }
    }
    componentDidMount(){
        console.log('component did mount')
        const token = localStorage.getItem('auth-token')
        if( token && localStorage.getItem('auth-login')){
            axios.get('/users/list',{
                headers:{
                    Authorization:token
                }
            })
                .then(response=>{
                    console.log(response.data)
                    this.setState({users:response.data})
                    axios.get(`/users/show`,{
                        headers:{
                            Authorization:token
                        }
                    })
                        .then(response=>{
                            console.log(response.data)
                            this.setState({id:response.data._id})
                             
                        })
                        .catch(err=>{
                            console.log(err)
                            this.props.history.push('/SignIn')
                        })
                     
                })
                .catch(err=>{
                    console.log(err)
                    this.props.history.push('/SignIn')
                })
            
        }else{
            this.props.history.push('/SignIn')
        }
 
    }
 
    render(){
        console.log('rendered', this.state)
        if(this.state.users.length==0){
            return(
            
                <div>
                    <ul>
                        <li style={{ listStyleType: "none" }} key={1}>{"No Users"}</li>
                        
                    </ul>
                </div>
            )

        }
        else{
            return(
                
                <div>
                    <ul>
                        {this.state.users.map((user)=> {
                            return <li style={{ listStyleType: "none" }} key={user._id}>{user.username}
                                <br/>{user.email}
                                <br/>{user.phone}
                                { this.state.id === user._id &&
                                
                                    <Link to={`/EditUser/${user._id}`}>
                                        <button>Edit</button>
                                    </Link>
                                
                                }
                                
                            </li>
                        })}
                    </ul>
                </div>
            )
        }
            
    }
}

export default Users