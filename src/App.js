import React, { Component } from 'react'
import './App.css';
import axios from 'axios'
import Output from './components/Output'

export default class App extends Component {
    constructor(props) {
    super(props);

        this.state = {
            name: [],
            region: [],
            coat: [],
            seat: [],
            aliases: [],
            founder: [],
            founderName: [],
            books: []
        }
    }
componentDidMount() {
    axios.all([
    axios.get("http://anapioficeandfire.com/api/characters/16"),
    axios.get("http://www.anapioficeandfire.com/api/houses/378"),
    axios.get("http://www.anapioficeandfire.com/api/houses/229"),
    axios.get("http://www.anapioficeandfire.com/api/houses/17"),
    axios.get("http://www.anapioficeandfire.com/api/characters/901"),
])
    .then(axios.spread((name,region, coat, seat, aliases) => {
        this.setState({name: name.data});
        this.setState({region: region.data});
        this.setState({coat: coat.data});
        this.setState({seat: seat.data.seats[1]});
        this.setState({aliases: aliases.data.aliases[1]});
    }))
    .catch(error => {
        console.log(error);
    })

    fetch("http://www.anapioficeandfire.com/api/houses/362")
        .then(res => {
           return res.json()
        })
        .then(data => {
            return data.founder;
        })
        .then(data => {
            return fetch(data);
        })
        .then(result => {
            return result.json()
         })
        .then(founder => {
            this.setState({founder: founder.name})
        }) 

        axios.get('http://www.anapioficeandfire.com/api/characters/232')
        .then(result => {
            return result.data.povBooks
        })
        .then((data) => {
                    data.map(result => {
                    return axios.get(result)
                    .then(name => {
                         console.log(name.data.name);
                         this.setState({books: name.data.name});
                    })
                })
        });


}
render() {
    return (
        <div>
          <Output name={this.state.name.born} />
          <Output name={this.state.region.region} />
          <Output name={this.state.coat.coatOfArms} />
          <Output name={this.state.seat} />
          <Output name={this.state.aliases} />
          <Output name={this.state.founder} />
          <Output name={this.state.books} />
        </div>
    )
}
}