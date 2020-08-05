import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setSearchField} from '../actions';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';

const mapStateToProps = state => {
    return {
        searchField: state.searchField
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
     onSearchChange: (event) => dispatch(setSearchField(event.target.value))
  }
}


class App extends Component 
{
    constructor()
        {
            super()
            this.state = 
            {
                robots: []
            }
        }

    componentDidMount()
    {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())
        .then(users => {this.setState({robots: users})});
    }

    render()
    {
        const {robots} = this.state;
        const {searchField,onSearchChange} = this.props;
        const filteredRobots = robots.filter(robot =>
            {
                return robot.name.toLowerCase().includes(searchField.toLowerCase());
            }
            );
            return !robots.length ?
                <h1>Loading</h1>:
                  (
                    <div className = "tc">
                        <h1 className = "f1">Robofriend</h1>
                        <SearchBox searchChange = {onSearchChange}/>
                        <Scroll>
                         <CardList robots = {filteredRobots}/>
                        </Scroll>
                    </div>
                );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);