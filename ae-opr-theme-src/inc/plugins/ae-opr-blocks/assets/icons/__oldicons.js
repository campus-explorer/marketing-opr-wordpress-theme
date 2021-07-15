import React from 'react';
import {ReactComponent as CrimeIcon} from './icon-crime.svg';
import {ReactComponent as AlarmIcon} from './icon-alarm.svg';
import {ReactComponent as CityIcon} from './icon-city.svg';
import {ReactComponent as HomeIcon} from './icon-home.svg';
import {ReactComponent as PoliceIcon} from './icon-police.svg';
import styled from 'styled-components';

//Master Icons Component File
//Each icon was taken though SVGOMG to remove Creator Cruft and optimize the XML. Can this be automated?
//TODO: make an Icons package that can be loaded as a component, like https://github.com/necolas/icon-builder-example
//TODO: Webpack modules to clean up SVGs. 

const defaultColor = '#333';

const StyledCrime = styled(CrimeIcon)`
	path{
		fill:${props=>props.fill || defaultColor}!important;
		}
	`
export class Crime extends React.Component {
	render(){
	  return (
	    <StyledCrime fill={this.props.fill}/>			
	  );
    }
}
const StyledAlarm = styled(AlarmIcon)`
	path{
		fill:${props=>props.fill || defaultColor}!important;
		}
	`
export class Alarm extends React.Component {
	render(){
	  return (
	    <StyledAlarm fill={this.props.fill}/>			
	  );
    }
}
const StyledCity = styled(CityIcon)`
	path{
		fill:${props=>props.fill || defaultColor}!important;
		}
	`
export class City extends React.Component {
	render(){
	  return (
	    <StyledCity fill={this.props.fill}/>			
	  );
    }
}
const StyledHome = styled(HomeIcon)`
	path{
		fill:${props=>props.fill || defaultColor}!important;
		}
	`
export class Home extends React.Component {
	render(){
	  return (
	    <StyledHome fill={this.props.fill}/>			
	  );
    }
}
const StyledPolice = styled(PoliceIcon)`
	path{
		fill:${props=>props.fill || defaultColor}!important;
		}
	`
export class Police extends React.Component {
	render(){
	  return (
	    <StyledPolice fill={this.props.fill}/>			
	  );
    }
}
