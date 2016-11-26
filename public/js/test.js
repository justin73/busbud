/**
 * @jsx React.DOM
 */
// var React = require('react');
// var ReactDOM = require('react-dom');

var App = React.createClass({
    callAjax:function () {
        console.log("lets search")
        $.ajax({
            url: "/search",
            success: function(data){
                data = $.parseJSON(data)
                console.log(data.complete)
                if (data.complete){
                    departure_list = data.departures
                    operator_obj_list = data.operators
                    $.each(departure_list, function(index, this_obj){
                        depature_time = this_obj.departure_time
                        depature_tag = "<p className='time'>"+depature_time+"</p>"
                        arrival_time = this_obj.arrival_time
                        arrival_tag = "<p className='time'>"+arrival_time+"</p>"
                        prices = this_obj.prices.total
                        prices_tag = "<p className='price'>"+prices+"</p>"
                        seat_class = this_obj.class
                        seat_tag = "<p className='seat'>"+seat_class+"</p>"
                        link = this_obj.links.deeplink
                        link_tag = "<p className='link'>"+link+"</p>"
                        operator_id =this_obj.operator_id
                        operator_img = ""
                        $.each(operator_obj_list, function(index, operator_obj){
                            if(operator_id == operator_obj.id){
                                operator_img = operator_obj.logo_url
                            }
                        })
                        operator_logo_tag = "<img className='logo' src="+operator_img+"></img>"
                        new_item = '<li className="result_item"><div className="result_conatiner">'+depature_tag+arrival_tag+prices_tag+seat_tag+link_tag+operator_logo_tag+'</div></li>'
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
                <div>
                    <div>
                        <input className="depature" value="NEW YORK" readOnly></input>
                        <input className="destination" value="MONTREAL" readOnly></input>
                    </div>
                    <button id="search_btn" className="search" onClick={this.callAjax}> Search</button>
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