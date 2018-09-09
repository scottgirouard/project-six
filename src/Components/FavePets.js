import React, { Component } from 'react';
import Header from './Header';
import firebase from 'firebase';
import PetCard from './PetCard';


const auth = firebase.auth();


class FavePets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // userID: this.props.user.uid,
            favePets: []
        }
    }


    componentDidMount = () => {
        auth.onAuthStateChanged((user) => {
            let faveRef = firebase.database().ref(`${user.uid}/faves`); 
            faveRef.on('value', (snapshot) => {
                if (snapshot.val()) {
                    let favePets = Object.entries(snapshot.val()).map((pet) => {
                        return ({
                            name: pet[1].name,
                            breed: pet[1].breed,
                            photo: pet[1].photo,
                            sex: pet[1].sex,
                            id: pet[1].id,
                            key: pet[0]
                        })
                    });
                    this.setState({favePets});
                }
            })
                
        })
    }

    render() {
        return (
            <div className="FavePets">
                 <Header user={this.props.user} login={this.props.login} logout={this.props.logout} location={this.props.location} breeds={this.props.breeds} getPets={this.props.getPets} />

                 <h2>FAVE PETS LIST</h2>
                {
                    this.state.favePets.map((pet) => {

                       return (
                    <div>       
                        <PetCard pet={pet} key={pet.key} />
                        <button id={pet.key} onClick={this.props.deleteFromFaves}>DELETE FROM FAVES</button>
                    </div>    
                        )
                        
                    })
                }


            </div>
        )
    }

}


export default FavePets;