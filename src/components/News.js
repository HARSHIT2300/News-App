import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'

export class News extends Component {
   static defaultProps = {
       page_size : 8,
       country : "in",
       category : "general"
   }
   
   static PropsTypes = {
        page_size : PropTypes.number,
        country : PropTypes.string,
        category : PropTypes.string
   }
   
    constructor(){
       super();
    //    console.log("Printing from News Component");
       this.state = {
           articles : [],
           loading : false,
           page : 1,
           total_articles : 0
       }
   }
//    U can also specify spacesize and total articles directly in line 22 where u have set the state
//     Order of execution of functions --> constructor   then render then componentdidmount
//  update page funtion is basically used for reducing the redundant pieces of code in componentdidmount,handleprevclick and handlenext click
   async updatePage()
   {
    let url_fetchnews = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=5f81d14a00414d248842915dd090a7ed&page=${this.state.page}&pageSize=${this.props.page_size}`;
    let fetched_data = await fetch(url_fetchnews);
    let parsed_data = await fetched_data.json();
    this.setState({
        total_articles : parsed_data.totalResults,
        articles : parsed_data.articles
        
    })
   }
  async componentDidMount(){
    //    let url_fetchnews = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=5f81d14a00414d248842915dd090a7ed&page=1&pageSize=${this.props.page_size}`;
    //    let fetched_data = await fetch(url_fetchnews);
    //    let parsed_data = await fetched_data.json();
       
       this.updatePage();
   }
   handlePrevClick = async ()=>
   {
    // let url_fetchnews = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=5f81d14a00414d248842915dd090a7ed&page=${this.state.page - 1}&pageSize=${this.props.page_size}`;
    // let fetched_data = await fetch(url_fetchnews);
    // let parsed_data = await fetched_data.json();
    await this.setState({
        page : this.state.page - 1,
    });
    this.updatePage();
   }
   handleNextClick = async ()=>
   {
    // let url_fetchnews = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=5f81d14a00414d248842915dd090a7ed&page=${this.state.page + 1}&pageSize=${this.props.page_size}`;
    // let fetched_data = await fetch(url_fetchnews);
    // let parsed_data = await fetched_data.json();
   await this.setState({
        page : this.state.page + 1,
    });
    this.updatePage();
   }

    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center" style={{ margin : '30px 0px', marginTop : '80px' }}>News Monkey --- Top Headlines</h1>
                <div className="row">
                {this.state.articles.map((element)=>{
                
                return    <div className="col-md-4" key ={element.url}>
                           <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl = {element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                        </div>
                   
                })}
                </div>
                <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                <button disabled={(this.state.page*this.props.page_size)>=this.state.total_articles}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>

            </div>
            
        )
    }
}

export default News
