/**
 * @jsx React.DOM
 */
// var React = require('react');
// var ReactDOM = require('react-dom');

var App = React.createClass({
    callAjax:function () {
        console.log("lets search")
        $.ajax({
            url: "/initial_search",
            success: function(data){
                data = $.parseJSON(data)
                if (data.complete){
                    departure_list = data.departures
                    operator_obj_list = data.operators
                    location_obj_list = data.locations
                    stop_list = data.cities
                    origin_city_id = data.origin_city_id
                    destination_city_id = data.destination_city_id

                    $.each(departure_list, function(index, this_obj){
                        depature_time = this_obj.departure_time
                        depature_time = moment(depature_time).format("HH:MM");
                        depart_location_id = this_obj.origin_location_id
                        $.each(location_obj_list, function(index, location_obj){
                            if(depart_location_id == location_obj.id){
                                depart_location = location_obj.name
                            }
                        })
                        depart_city = ""
                        $.each(stop_list, function(index, city_obj){
                            if(origin_city_id == city_obj.id){
                                depart_city = city_obj.name
                            }
                        })
                        depature_tag = "<p class='time'>"+depature_time+"<span class='location'>"+depart_location+"<span class='city'>( "+depart_city+" )</span></span></p>"
                        arrival_time = this_obj.arrival_time
                        arrival_time = moment(arrival_time).format("HH:MM");
                        dest_location_id = this_obj.destination_location_id
                        $.each(location_obj_list, function(index, location_obj){
                            if(dest_location_id == location_obj.id){
                                dest_location = location_obj.name
                            }
                        })
                        arrival_city = ""
                        $.each(stop_list, function(index, city_obj){
                            if(destination_city_id == city_obj.id){
                                arrival_city = city_obj.name
                            }
                        })
                        arrival_tag =  "<p class='time'>"+arrival_time+"<span class='location'>"+dest_location+"<span class='city'>( "+arrival_city+" )</span></span></p>"
                        prices = this_obj.prices.total
                        prices_tag = "<p class='price'>$"+prices/100.00+"<span>CAD</span></p>"
                        seat_class = this_obj.class
                        seat_tag = "<p class='seat'>"+seat_class+"</p>"
                        left_col = "<div class='bus_info'><div>"+depature_tag+arrival_tag+prices_tag+seat_tag+"</div></div>"
                        link = this_obj.links.deeplink
                        link_tag = "<div class='booking_link'><a class='link' href='"+link+"'>BOOK NOW</a></div>"
                        operator_id =this_obj.operator_id
                        operator_img = ""
                        $.each(operator_obj_list, function(index, operator_obj){
                            if(operator_id == operator_obj.id){
                                operator_img = operator_obj.logo_url
                            }
                        })
                        operator_logo_tag = "<div class='logo_container'><div class='flex_container'><img class='logo' src="+operator_img+"></img></div></div>"
                        new_item = '<li class="result_item"><div class="result_conatiner">'+left_col+operator_logo_tag+link_tag+'</div></li>'
                        $("#result_list").append(new_item)
                    })
                }
                else{
                    console.log("reload the page")
                }
            }.bind(this),
            error: function(xhr, status, error){
                console.log(this.props.url, status, error.toString());
                this.setState({error: true});
            }.bind(this)
        });
    },
    render: function () {
        return(
            <section>
                <div className="banner_background">
                    <img src="/logo.png"></img>
                </div>
                <div className="search_section">
                    <div className="input_container">
                        <input type="text" className="depature" value="NEW YORK" readOnly></input>
                        <input type="text" className="destination" value="MONTREAL" readOnly></input>
                    </div>
                    <button id="search_btn" className="search hvr-sweep-to-bottom" onClick={this.callAjax}> Search</button>
                </div>
                <div className="result_wrapper">
                    <ul id="result_list" className="result_list">
                    </ul>
                </div>
            </section>
        )
    }
});
React.render(
    <App />,
    document.getElementById('index')
);