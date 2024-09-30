import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 8,
    category:'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category:PropTypes.string
  }

  capitalizeFirstLetter=((string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
})


  
    constructor(props){
        
        super(props);
        // console.log("Hello I am a constructor from news component")
        this.state={
            articles:[],
            // articles:[
                
            //     {
            //       "source": {
            //         "id": null,
            //         "name": "Gothamist"
            //       },
            //       "author": "Rosemary Misdary",
            //       "title": "Crypto company slammed for pollution sues to keep mining bitcoin at NY power plant",
            //       "description": "The Greenidge Generation gas-fired power plant is home to a large bitcoin mining operation.\n \n\nLocal environmentalists have long opposed the natural gas power plant on Seneca Lake. [ more › ]",
            //       "url": "https://gothamist.com/news/crypto-company-slammed-for-pollution-sues-to-keep-mining-bitcoin-at-ny-power-plant",
            //       "urlToImage": "https://api-prod.gothamist.com/images/346742/fill-1200x650|format-webp|webpquality-85/",
            //       "publishedAt": "2024-08-22T15:23:00Z",
            //       "content": "The owners of a bitcoin mine in upstate New York have filed a lawsuit against the state seeking to block the imminent closure of the natural gas power plant fueling their 24/7 crypto operation.\r\nGree… [+2410 chars]"
            //     },
            //     {
            //       "source": {
            //         "id": null,
            //         "name": "Forbes"
            //       },
            //       "author": "Dave Birnbaum, Contributor, \n Dave Birnbaum, Contributor\n https://www.forbes.com/sites/davidbirnbaum/",
            //       "title": "How The Fed Rate Cut Could Make Bitcoin Volatile",
            //       "description": "The bitcoin market is bracing for a volatile month as the U.S. Federal Reserve’s anticipated interest rate cut looms large.",
            //       "url": "https://www.forbes.com/sites/davidbirnbaum/2024/09/12/how-the-fed-rate-cut-could-make-bitcoin-volatile/",
            //       "urlToImage": "https://imageio.forbes.com/specials-images/imageserve/66e34340b8836d26f125e487/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
            //       "publishedAt": "2024-09-12T19:42:05Z",
            //       "content": "Federal Reserve Board Chairman Jerome Powell. (Photo by Alex Wong/Getty Images)\r\nGetty Images\r\n(Full disclosure: Im helping build Coinbits.app, a bitcoin banking platform.)\r\nThe bitcoin market is bra… [+5059 chars]"
            //     },
            //     {
            //       "source": {
            //         "id": "focus",
            //         "name": "Focus"
            //       },
            //       "author": "mit dpa",
            //       "title": "Banklizenz nötig - Deutsche Finanzaufsicht zieht 13 Krypto-Geldautomaten aus dem Verkehr",
            //       "description": "Ob Bitcoin oder andere Krypto-Währungen, die Alternativen zu konventionellem Geld stehen bei vielen Menschen hoch im Kurs. Es gibt sogar Krypto-Wechselautomaten. Die riefen nun aber eine Behörde auf den Plan.",
            //       "url": "https://www.focus.de/finanzen/boerse/banklizenz-noetig-deutsche-finanzaufsicht-zieht-13-krypto-geldautomaten-aus-dem-verkehr_id_260241946.html",
            //       "urlToImage": "https://p6.focus.de/img/fotos/id_260241945/bitcoin.jpg?im=Crop%3D%280%2C375%2C3464%2C1732%29%3BResize%3D%281200%2C627%29&impolicy=perceptual&quality=mediumHigh&hash=d0c175b801711b19550ad78af0c617a791b340cb70efcc7097605ff59888c6af",
            //       "publishedAt": "2024-08-21T06:10:14Z",
            //       "content": "Ob Bitcoin oder andere Krypto-Währungen, die Alternativen zu konventionellem Geld stehen bei vielen Menschen hoch im Kurs. Es gibt sogar Krypto-Wechselautomaten. Die riefen nun aber eine Behörde auf … [+2247 chars]"
            //     },
            //     {
            //       "source": {
            //         "id": null,
            //         "name": "Quartz India"
            //       },
            //       "author": "Vinamrata Chaturvedi",
            //       "title": "A guide to handling crypto during a divorce",
            //       "description": "Going through a divorce can be a complicated, stressful, and drawn-out process. One of the most critical aspects that divorcing spouses must address is their finances. While managing traditional assets can be relatively straightforward, the rise of cryptocurr…",
            //       "url": "https://qz.com/deal-cryptocurrency-during-a-divorce-1851634146",
            //       "urlToImage": "https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/d5cdb964e244e0d39dcd63feee8031df.jpg",
            //       "publishedAt": "2024-09-04T09:00:00Z",
            //       "content": "It is crucial to have a fundamental understanding of cryptocurrency and its mechanisms, especially during divorce proceedings, where the identification and valuation of assets are central to the proc… [+731 chars]"
            //     },
            //     {
            //         "source": {
            //           "id": null,
            //           "name": "Forbes"
            //         },
            //         "author": "Billy Bambrough, Senior Contributor, \n Billy Bambrough, Senior Contributor\n https://www.forbes.com/sites/billybambrough/",
            //         "title": "Goldman Sachs Issues Huge Fed Crash Warning As A Legendary Trader Suddenly Flips His Bitcoin Price Prediction",
            //         "description": "Goldman Sachs analysts have issued a warning that this week's closely-watched jobs numbers could spark a stock market crash...",
            //         "url": "https://www.forbes.com/sites/digital-assets/2024/09/05/goldman-sachs-issues-huge-fed-crash-warning-as-a-legendary-trader-suddenly-flips-his-bitcoin-price-prediction/",
            //         "urlToImage": "https://imageio.forbes.com/specials-images/imageserve/626e4deb9cb7a8fb2aab7720/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
            //         "publishedAt": "2024-09-05T10:30:15Z",
            //         "content": "BitcoinBitcoin\r\n has been struggling over the last month as the bitcoin price teeters on the verge of \"a critical tipping point.\"\r\nSubscribe now to Forbes' CryptoAsset &amp; Blockchain Advisor and \"u… [+3738 chars]"
            //       },
            //       {
            //         "source": {
            //           "id": null,
            //           "name": "Quartz India"
            //         },
            //         "author": "Vinamrata Chaturvedi",
            //         "title": "Litecoin, Fantom, Klaytn, and more: Cryptos to watch this week",
            //         "description": "The stock markets have been showing signs of recovery, but the same cannot be said for the crypto markets, as Bitcoin is still below the $60,000 mark. This may change after the Federal Open Market Committee (FOMC) meeting and minutes this week, in addition to…",
            //         "url": "https://qz.com/litecoin-fantom-klaytn-cryptocurrencies-to-watch-this-1851625428",
            //         "urlToImage": "https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/2256121fe4ce085de14f00d6efcaa67d.jpg",
            //         "publishedAt": "2024-08-19T13:35:00Z",
            //         "content": "Founded by cryptocurrency entrepreneur Justin Sun in 2017, the Tron blockchain network aims to decentralize the internet. By hosting decentralized applications, also known as dApps, it intends to pro… [+518 chars]"
            //       },
            //       {
            //         "source": {
            //           "id": null,
            //           "name": "Clubic"
            //         },
            //         "author": "Samir Rahmoune",
            //         "title": "Le Bitcoin s'effondre depuis une semaine. Va-t-il passe sous la barre des 50 000 dollars ?",
            //         "description": "Le géant de la cryptomonnaie connaît un début de mois de septembre très violent. Au point même de se demander si le Bitcoin ne va pas retomber à des niveaux plus vus depuis le début de l'année.",
            //         "url": "https://www.clubic.com/actualite-536597-le-bitcoin-s-effondre-depuis-une-semaine-va-t-il-passe-sous-la-barre-des-50-000-dollars.html",
            //         "urlToImage": "https://pic.clubic.com/v1/images/2070951/raw",
            //         "publishedAt": "2024-09-07T11:27:00Z",
            //         "content": "Il y a un mois presque jour pour jour, le Bitcoin suivait la grande peur boursière qui venait de prendre la planète à la suite d'un lundi noir au Nikkei, et s'effondrait très violemment avant de repr… [+322 chars]"
            //       },
                  
            //       {
            //         "source": {
            //           "id": null,
            //           "name": "Forbes"
            //         },
            //         "author": "Billy Bambrough, Senior Contributor, \n Billy Bambrough, Senior Contributor\n https://www.forbes.com/sites/billybambrough/",
            //         "title": "Bitcoin’s ‘Next Stop’—China Could Be About To Blow Janet Yellen’s $1 Trillion Crypto Price Bombshell Out Of The Water",
            //         "description": "U.S. Treasury secretary Janet Yellen could inject up to $1 trillion into markets before the end of 2024—something that one legendary trader thinks would kick off a bitcoin price boom...",
            //         "url": "https://www.forbes.com/sites/digital-assets/2024/08/17/bitcoins-next-stop-china-could-be-about-to-blow-janet-yellens-1-trillion-crypto-price-bombshell-out-of-the-water/",
            //         "urlToImage": "https://imageio.forbes.com/specials-images/imageserve/662cd18980ea913a4b6f6fa9/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
            //         "publishedAt": "2024-08-17T11:45:11Z",
            //         "content": "BitcoinBitcoin\r\n and crypto prices have swung wildly this week as iPhone maker Apple announces a game-changing update to its Wallet app.\r\nSubscribe now to Forbes' CryptoAsset &amp; Blockchain Advisor… [+3520 chars]"
            //       },
            //       {
            //         "source": {
            //           "id": null,
            //           "name": "Forbes"
            //         },
            //         "author": "Billy Bambrough, Senior Contributor, \n Billy Bambrough, Senior Contributor\n https://www.forbes.com/sites/billybambrough/",
            //         "title": "‘Extreme Fear’ And Fed Panic Spark Sudden $2 Trillion Crypto Price Crash—Hitting Bitcoin, Ethereum, BNB, Solana, XRP And Dogecoin",
            //         "description": "The bitcoin price has dropped below a key resistance level as the crypto market crashes under $2 trillion...",
            //         "url": "https://www.forbes.com/sites/digital-assets/2024/09/06/extreme-fear-and-fed-panic-and-spark-sudden-2-trillion-crypto-price-crash-hitting-bitcoin-ethereum-bnb-solana-xrp-and-dogecoin/",
            //         "urlToImage": "https://imageio.forbes.com/specials-images/imageserve/6456424532c7f204c1e31892/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
            //         "publishedAt": "2024-09-06T21:45:13Z",
            //         "content": "BitcoinBitcoin\r\n and cryptoincluding top ten coins ethereum, BNBBNB\r\n, solana, XRPXRP\r\n and dogecoinhave crashed after a serious Goldman Sachs warning.\r\nSubscribe now to Forbes' CryptoAsset &amp; Blo… [+3292 chars]"
            //       }
            //   ],
            loading:false,
            page:1,
            totalResults:0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;

    }

    async updateNews(){
      this.props.setProgress(10);
      const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      this.props.setProgress(30);
      let parseData = await data.json();
      this.props.setProgress(70);
      console.log(parseData);
      this.setState({
          articles: parseData.articles,
          totalResults: parseData.totalResults,
          loading:false
      });
      this.props.setProgress(100);


    }

    async componentDidMount(){
      // console.log("sjh");
      // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6c73f83ed29740688209c673a59d14a5&page=1&pageSize=${this.props.pageSize}`;
      // this.setState({loading:true});
      // let data = await fetch(url);
      // let parseData = await data.json();
      // console.log(parseData);
      // this.setState({
      //     articles: parseData.articles,
      //     totalResults: parseData.totalResults,
      //     loading:false
      // });
      this.updateNews();
  }
  
    handlePrevClick=async()=>{
      // console.log("Previous");
      // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6c73f83ed29740688209c673a59d14a5&page=${this.state.page - 1} &pageSize=${this.props.pageSize}`;
      // this.setState({loading:true});  
      // let data= await fetch(url);
      // let parseData= await data.json();
      // console.log(parseData);
      // this.setState({
      // page: this.state.page - 1,
      // articles: parseData.articles,
      // loading:false
    // })
       this.setState({page:this.state.page-1})
       this.updateNews();
    }

    handleNextClick=async()=>{
      // console.log("Next");
      // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
      //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6c73f83ed29740688209c673a59d14a5&page=${this.state.page + 1} &pageSize=${this.props.pageSize}`;
      //   this.setState({loading:true});
      //   let data= await fetch(url);
      //   let parseData= await data.json();
      //   // console.log(parseData);
      //   this.setState({
      //   page: this.state.page + 1,
      //   articles: parseData.articles,
      //   loading:false
      // })
      // }
      this.setState({page:this.state.page+1});
      this.updateNews();
    }

    fetchMoreData = async() => {
      this.setState({page:this.state.page+1});
      const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      // this.setState({loading:true});
      let data = await fetch(url);
      let parseData = await data.json();
      console.log(parseData);
      this.setState({
          articles: this.state.articles.concat(parseData.articles),
          totalResults: parseData.totalResults,
          loading:false
      });
    };

  //   async componentDidMount(){
  //     console.log("sjh");
  //     let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6c73f83ed29740688209c673a59d14a5&page=1&pageSize=${this.props.pageSize}`;
  //     this.setState({loading:true});
  //     let data = await fetch(url);
  //     let parseData = await data.json();
  //     console.log(parseData);
  //     this.setState({
  //         articles: parseData.articles,
  //         totalResults: parseData.totalResults,
  //         loading:false
  //     });
  // }
  
  //   handlePrevClick=async()=>{
  //     console.log("Previous");
  //     let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6c73f83ed29740688209c673a59d14a5&page=${this.state.page - 1} &pageSize=${this.props.pageSize}`;
  //     this.setState({loading:true});  
  //     let data= await fetch(url);
  //     let parseData= await data.json();
  //     console.log(parseData);
  //     this.setState({
  //     page: this.state.page - 1,
  //     articles: parseData.articles,
  //     loading:false
  //   })
  //   }

  //   handleNextClick=async()=>{
  //     console.log("Next");
  //     if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
  //       let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6c73f83ed29740688209c673a59d14a5&page=${this.state.page + 1} &pageSize=${this.props.pageSize}`;
  //       this.setState({loading:true});
  //       let data= await fetch(url);
  //       let parseData= await data.json();
  //       // console.log(parseData);
  //       this.setState({
  //       page: this.state.page + 1,
  //       articles: parseData.articles,
  //       loading:false
  //     })
  //     }
  //   }
  render() {
    return (
      <>
        <h1 className="text-center"style={{margin:'35px 0px'}}>NexwsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        {/* <div className="row">
            {!this.state.loading && this.state.articles.map((element)=>{
                return <div className="col-md-4" key={element.url}> */}
                {/* <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url}/> */}
                {/* <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date ={element.publishedAt} source={element.source.name}/>
             </div>
            })}
            
        </div> */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
            {this.state.articles.map((element)=>{
                return <div className="col-md-4" key={element.url}>
                {/* <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url}/> */}
                <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date ={element.publishedAt} source={element.source.name}/>
             </div>
            })} 
        </div>
        </div>
        </InfiniteScroll>


        

        {/* <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            
        </div> */}
      </>
    )
  }
}

export default News
