/**
 * @jsx React.DOM
 */

// // var React = require('react');
// // var ReactDOM = require('react-dom');

// var App = React.createClass({
//     callAjax:function () {
//         $.ajax({
//             url: "/initial_search",
//             success: function(data){
//                 data = $.parseJSON(data)
//                 if (data.complete){

//                     departure_list = data.departures
//                     operator_obj_list = data.operators
//                     location_obj_list = data.locations
//                     stop_list = data.cities
//                     origin_city_id = data.origin_city_id
//                     destination_city_id = data.destination_city_id

//                     $.each(departure_list, function(index, this_obj){
//                         depature_time = this_obj.departure_time
//                         depature_time = moment(depature_time).format("HH:MM");
//                         depart_location_id = this_obj.origin_location_id
//                         $.each(location_obj_list, function(index, location_obj){
//                             if(depart_location_id == location_obj.id){
//                                 depart_location = location_obj.name
//                             }
//                         })
//                         depart_city = ""
//                         $.each(stop_list, function(index, city_obj){
//                             if(origin_city_id == city_obj.id){
//                                 depart_city = city_obj.name
//                             }
//                         })
//                         depature_tag = "<p class='time'>"+depature_time+"<span class='location'>"+depart_location+"<span class='city'>( "+depart_city+" )</span></span></p>"
//                         arrival_time = this_obj.arrival_time
//                         arrival_time = moment(arrival_time).format("HH:MM");
//                         dest_location_id = this_obj.destination_location_id
//                         $.each(location_obj_list, function(index, location_obj){
//                             if(dest_location_id == location_obj.id){
//                                 dest_location = location_obj.name
//                             }
//                         })
//                         arrival_city = ""
//                         $.each(stop_list, function(index, city_obj){
//                             if(destination_city_id == city_obj.id){
//                                 arrival_city = city_obj.name
//                             }
//                         })
//                         arrival_tag =  "<p class='time'>"+arrival_time+"<span class='location'>"+dest_location+"<span class='city'>( "+arrival_city+" )</span></span></p>"
//                         prices = this_obj.prices.total
//                         prices_tag = "<p class='price'>$"+prices/100.00+"<span>CAD</span></p>"
//                         seat_class = this_obj.class
//                         seat_tag = "<p class='seat'>"+seat_class+"</p>"
//                         left_col = "<div class='bus_info'><div>"+depature_tag+arrival_tag+prices_tag+seat_tag+"</div></div>"
//                         link = this_obj.links.deeplink
//                         link_tag = "<div class='booking_link'><a class='link' href='"+link+"'>BOOK NOW</a></div>"
//                         operator_id =this_obj.operator_id
//                         operator_img = ""
//                         $.each(operator_obj_list, function(index, operator_obj){
//                             if(operator_id == operator_obj.id){
//                                 operator_img = operator_obj.logo_url
//                             }
//                         })
//                         operator_logo_tag = "<div class='logo_container'><div class='flex_container'><img class='logo' src="+operator_img+"></img></div></div>"
//                         new_item = '<li class="result_item"><div class="result_conatiner">'+left_col+operator_logo_tag+link_tag+'</div></li>'
//                         $("#result_list").append(new_item)
//                     })
//                 }
//                 else{
//                     console.log("reload the page")
//                 }
//             }.bind(this),
//             error: function(xhr, status, error){
//                 console.log(this.props.url, status, error.toString());
//                 this.setState({error: true});
//             }.bind(this)
//         });
//     },
//     render: function () {
//         return(
//             <section>
//                 <div className="banner_background">
//                     <img src="/logo.png"></img>
//                 </div>
//                 <div className="search_section">
//                     <div className="input_container">
//                         <input type="text" className="depature" value="NEW YORK" readOnly></input>
//                         <input type="text" className="destination" value="MONTREAL" readOnly></input>
//                     </div>
//                     <button id="search_btn" className="search hvr-sweep-to-bottom" onClick={this.callAjax}> Search</button>
//                 </div>
//                 <div className="result_wrapper">
//                     <ul id="result_list" className="result_list">
//                     </ul>
//                 </div>
//             </section>
//         )
//     }
// });


var App = React.createClass({
    getInitialState: function(){
        return{
            searchResults: [],

        }
    },
    showResults: function(response){
        final_departure_list = new Array()
        departure_list = response.departures
        operator_obj_list = response.operators
        location_obj_list = response.locations
        stop_list = response.cities
        origin_city_id = response.origin_city_id
        destination_city_id = response.destination_city_id
        $.each(departure_list, function(index, depart_item){
            departure_obj = {}
            departure_obj.departure_time = moment(depart_item.departure_time).format("HH:MM");
            departure_obj.arrival_time = moment(depart_item.arrival_time).format("HH:MM");
            departure_obj.link = depart_item.links.deeplink
            departure_obj.price = depart_item.prices.total/100
            departure_obj.class = depart_item.class
            depart_location_id = depart_item.origin_location_id
            $.each(location_obj_list, function(index, location_obj){
                if(depart_location_id == location_obj.id){
                    departure_obj.depart_location = location_obj.name
                }
            })
            $.each(stop_list, function(index, city_obj){
                if(origin_city_id == city_obj.id){
                    departure_obj.depart_city = city_obj.name
                }
            })
            dest_location_id = depart_item.destination_location_id
            $.each(location_obj_list, function(index, location_obj){
                if(dest_location_id == location_obj.id){
                    departure_obj.dest_location = location_obj.name
                }
            })
            $.each(stop_list, function(index, city_obj){
                if(destination_city_id == city_obj.id){
                    departure_obj.arrival_city= city_obj.name
                }
            })
            operator_id =depart_item.operator_id
            operator_img = ""
            $.each(operator_obj_list, function(index, operator_obj){
                if(operator_id == operator_obj.id){
                    departure_obj.operator_img = operator_obj.logo_url
                }
            })
            final_departure_list.push(departure_obj)
        })
        searchResults =  final_departure_list
        this.setState({
            searchResults: final_departure_list,
        })
    },
    search:function(){
        $.ajax({
            type:"GET",
            url:"/initial_search",
            success:function(data){
                data = $.parseJSON(data)
                if (data.complete){
                    this.showResults(data)
                }
                else{
                    $.ajax({
                        type:"GET",
                        url:"/initial_search",
                        success:function(data){
                            data = $.parseJSON(data)
                            this.showResults(data)
                        }.bind(this)
                    })
                }
            }.bind(this)
        })
    },
    render:function(){
        return(
            <div>
                <div className="banner_background">
                    <img src="/logo.png"></img>
                </div>
                <SearchBox search={this.search}/>
                <Results searchResults = {this.state.searchResults} />
            </div>
        )
    }
})

var SearchBox = React.createClass({
    createAjax:function(){
        this.props.search()
    },
    render:function(){
        return(
            <div>
                <div className="search_section">
                    <div className="input_container">
                        <input type="text" className="depature" value="NEW YORK" readOnly></input>
                        <input type="text" className="destination" value="MONTREAL" readOnly></input>
                        <input type="text" className="date" value="2017-07-03" readOnly></input>
                    </div>
                    <button id="search_btn" className="search hvr-sweep-to-bottom" onClick={this.createAjax}> Search</button>
                </div>
            </div>
        )
    }
})

var Results = React.createClass({
    render:function(){
        var resultItems = this.props.searchResults.map(function(result){
            return <ResultItem departure_time={result.departure_time} arrival_time={result.arrival_time}
                        prices={result.price} link={result.link}
                        class={result.class} depart_location={result.depart_location}
                        depart_city={result.depart_city} dest_location={result.dest_location}
                        arrival_city={result.arrival_city}
                        operator_img = {result.operator_img}
                    />
        });
        return(
            <ul id="result_list" className="result_list">
                {resultItems}
            </ul>
        )
    }
})


var ResultItem = React.createClass({
    render: function(){
        return (
            <li className="result_item">
                <div className="result_conatiner">
                    <div className='bus_info'>
                        <div>
                            <p className='time'>{this.props.departure_time}<span className='location'>{this.props.depart_location}<span className='city'>( {this.props.depart_city} )</span></span></p>
                            <p className='time'>{this.props.arrival_time}<span className='location'>{this.props.dest_location}<span className='city'>( {this.props.arrival_city} )</span></span></p>
                            <p className='price'><span className="number">${this.props.prices}</span><span className="currency">CAD</span></p>
                            <p className='seat'>{this.props.class}</p>
                        </div>
                    </div>
                    <div className='logo_container'><div className='flex_container'><img className='logo' src={this.props.operator_img}></img></div></div>
                    <div className='booking_link'><a className='link' href={this.props.link}>BOOK NOW</a></div>
                </div>
            </li>
        )
    }
})

React.render(<App />, document.getElementById("index"))


