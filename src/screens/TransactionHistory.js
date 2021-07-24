import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, FlatList, LogBox} from 'react-native';
import {SearchBar} from 'react-native-elements';
import ItemHistory from '../components/ItemHistory';
import {connect} from 'react-redux';
import {historyGet, historyGetDefault} from '../redux/actions/transaction';

class TransactionHistory extends Component {
  state = {
    search: '',
    page: 1,
    items: [],
  };

  componentDidMount() {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }

  search = () => {
    const {token} = this.props.auth;
    const search = this.state.search;
    const page = 1;
    this.props.historyGet(search, page, token).then(() => {
      this.setState({items: this.props.transaction.search2});
      this.setState({page: 1});
    });
  };

  // infiniteDefault = () => {
  //   const {token} = this.props.auth;
  //   const page = this.state.page++;
  //   this.props.historyGetDefault(page, token).then(() => {
  //     this.setState({
  //       items: this.state.items.concat(this.props.transaction.search),
  //       isLoading: false,
  //       spinnerLoading: false,
  //     });
  //   });
  // };

  infiniteSearch = () => {
    this.setState({content: true});
    const {token} = this.props.auth;
    const search = this.state.search;
    const page = this.state.page;
    this.props.historyGet(search, page, token).then(() => {
      this.setState({
        items: this.state.items.concat(this.props.transaction.search2),
      });
    });
  };

  handleLoadMore = () => {
    if (this.state.page < this.props.transaction.pageInfo.totalPage) {
      this.setState(
        {
          page: this.state.page + 1,
        },
        () => {
          this.infiniteSearch();
        },
      );
    }
  };

  handleChange = val => {
    this.setState({
      search: val,
    });
  };

  render() {
    // const {search} = this.props.transaction;
    // search.map(val => val.refNo);
    // console.log(search.map(val => val.refNo));
    const isCloseToBottom = ({
      layoutMeasurement,
      contentOffset,
      contentSize,
    }) => {
      const paddingToBottom = 20;
      return (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
      );
    };
    return (
      <ScrollView
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            this.handleLoadMore();
          }
        }}
        scrollEventThrottle={1000}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.parent}>
          <SearchBar
            placeholder="Search"
            onChangeText={this.handleChange}
            onSubmitEditing={() => this.search()}
            value={this.state.search}
            platform="android"
            containerStyle={styles.searchContainer}
            inputStyle={styles.searchInput}
          />
          {this.state.search === '' ? (
            <View />
          ) : (
            // <FlatList
            //   style={styles.wrapperCard}
            //   data={this.props.transaction.search}
            //   renderItem={search => (
            //     <ItemHistory
            //       key={search.item.id}
            //       description={search.item.description}
            //       refNo={search.item.refNo}
            //       phoneRecipient={search.item.phoneRecipient}
            //       amount={search.item.amount}
            //     />
            //   )}
            //   keyExtractor={search => search.id}
            // />
            <FlatList
              style={styles.wrapperCard}
              data={this.state.items}
              renderItem={search => (
                <React.Fragment>
                  <ItemHistory
                    key={search.item.id}
                    description={search.item.description}
                    refNo={search.item.refNo}
                    phoneRecipient={search.item.phoneRecipient}
                    amount={search.item.amount}
                  />
                </React.Fragment>
              )}
              keyExtractor={search => search.id}
            />
          )}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  transaction: state.transaction,
});

const mapDispatchToProps = {historyGet, historyGetDefault};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionHistory);

const styles = StyleSheet.create({
  searchContainer: {
    marginVertical: 20,
    borderRadius: 100,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    height: 55,
    justifyContent: 'center',
    elevation: 10,
  },
  searchInput: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  parent: {
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
