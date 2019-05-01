import React from 'react';
import './App.css';
import axios from 'axios';
import { Pagination, Menu, Button, Header, Image, Modal } from 'semantic-ui-react'


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      origarticles: [],
      activePage: 1,
      endpage: 50,
      totalpages: 10,
      itemperpage: 4,
      openModal: false,
      oneartical: []

    };
    this.handlePaginationChange = this.handlePaginationChange.bind(this);

    this.details = this.details.bind(this);
  }


  details(e) {

    this.setState({
      openModal: true,
      oneartical: e
    })
  }

  handlePaginationChange(e) {
    let a = [];

    if (this.state.activePage != parseInt(e.target.innerText)) {
      // Move next in paginations
      if (this.state.activePage < parseInt(e.target.innerText)) {

        for (var i = (parseInt(e.target.innerText) * 50) - 50; i < parseInt(e.target.innerText) * 50; i++) {
          a.push(this.state.origarticles[i]);
        }
        this.setState({
          activePage: parseInt(e.target.innerText),
          articles: a,
          endpage: parseInt(e.target.innerText) * 50

        })
      }
      // Move prevoius in pagination
      else {
        let diff = (parseInt(e.target.innerText) - this.state.activePage) + 1;
        diff = diff * 50;
        if (diff == 0) {
          diff = this.state.endpage - 50;
          diff = diff - 50;
        }
        else {
          diff = (parseInt(e.target.innerText) * 50) - 50;
        }

        for (var i = diff; i < diff + 50; i++) {
          a.push(this.state.origarticles[i]);
        }
        this.setState({
          activePage: parseInt(e.target.innerText),
          articles: a,
          endpage: parseInt(e.target.innerText) * 50

        })
      }

    }
  }
  filterarticals(event) {
    let filterData = [];
    if (event.target.value == '') {
      for (var i = this.state.endpage - 50; i < this.state.endpage; i++) {
        filterData.push(this.state.origarticles[i]);
      }


    }
    else {
      filterData = this.state.articles.filter(function (str) { return str.headline.main.includes(event.target.value) });
    }

    this.setState({
      articles: filterData
    })

  }

  // Fetched articals from nyTimes Api
  componentDidMount() {

    var itemperpage = 4; //initiate as false
    // device detection

    // if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    //   || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
    //   itemperpage = 1;
    // }

    axios.get(`https://api.nytimes.com/svc/archive/v1/2019/1.json?api-key=aIbTBUYozNixAbFVhJtE0Y2AIbUK1I4u`)
      .then(res => {
        // Sort data with respect to publication date
        res.data.response.docs.sort(function (a, b) {
          var dateA = new Date(a.pub_date), dateB = new Date(b.pub_date);
          return dateA - dateB;
        });


        this.setState({
          articles: res.data.response.docs.slice(1, 50),
          origarticles: res.data.response.docs,
          totalpages: (res.data.response.docs.length / 10).toFixed(0),
          itemperpage: itemperpage

        })

      })
  }
  closeModal = () => {
    this.setState({ openModal: false })
  }


  // Formate the date strings
  formatDate(date) {
    date = new Date(date);
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }
  render() {

    const src = 'https://www.shareicon.net/data/128x128/2015/07/24/74257_new_512x512.png'
    return (

      <div style={{ margin: '50px' }}>
        <Menu>
          <Menu.Item>
            <div class="ui search">
              <div class="ui icon input">
                <input class="prompt" type="text" placeholder='Search...' onChange={this.filterarticals.bind(this)} />
                <i class="search icon"></i>
              </div>
              <div class="results"></div>
            </div>
          </Menu.Item>
        </Menu>
        <div style={{ margin: '20px' }}>
          <Pagination
            activePage={this.state.activePage} totalPages={this.state.totalpages}
            pointing
            boundaryRange={8}
            firstItem={null}
            lastItem={null}
            prevItem={null}
            nextItem={null}
            secondary
            onPageChange={this.handlePaginationChange} />
        </div>

        <Modal open={this.state.openModal} onClose={this.closeModal} closeIcon centered={false}>
          <Modal.Header>{this.state.oneartical != undefined ? this.state.oneartical.source : 'Not provided'}</Modal.Header>
          <Modal.Content image>
            <Image wrapped size='medium' src={src} />
            <Modal.Description>
              <Header>{this.state.oneartical != undefined ? this.state.oneartical.document_type : 'Not provided'}</Header>
              <Header>{this.state.oneartical.headline != undefined ? this.state.oneartical.headline.main : 'Not provided'}</Header>
              <p>{this.state.oneartical != undefined ? this.state.oneartical.snippet : 'Not provided'}</p>
              <p>{this.state.oneartical != undefined ? this.state.oneartical.web_url : 'Not provided'}</p>

            </Modal.Description>
            <div class="extra content">
              <div class="center aligned author">
                {this.state.oneartical != undefined ? this.formatDate(this.state.oneartical.pub_date) : 'Not provided'}

              </div>
            </div>
          </Modal.Content>
        </Modal>
        <div className="ui three stackable cards">
          {this.state.articles.map((card) => (

            <div class="ui card" onClick={() => this.details(card)}>
              <div class="content">
                <div class="center aligned header" style={{ margin: '20px' }}>
                  <img src={src} />
                </div>

                <div class="center aligned header">{card != undefined ? card.source : 'Not provided'}</div>
                <div class="center aligned header">{card != undefined ? card.headline.main : 'Not provided'}</div>

                <div class="center aligned description">
                  <p>{card != undefined ? card.snippet : 'Not provided'}</p>
                </div>
              </div>
              <div class="extra content">
                <div class="center aligned author">
                  {card != undefined ? this.formatDate(card.pub_date) : 'Not provided'}

                </div>
              </div>
            </div>
          ))}

        </div>


      </div>
    );
  }
}

