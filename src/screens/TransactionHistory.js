import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, FlatList, LogBox} from 'react-native';
import {SearchBar} from 'react-native-elements';
import ItemHistory from '../components/ItemHistory';
import {connect} from 'react-redux';
import {historyGet, historyGetDefault} from '../redux/actions/transaction';
import {Picker} from '@react-native-picker/picker';

class TransactionHistory extends Component {
  state = {
    search: '',
    page: 1,
    items: [],
    data: [],
    sort: '1',
  };

  componentDidMount() {
    this.data();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sort !== this.state.sort) {
      this.data();
    }
    console.log(prevState.sort);
    console.log(this.state.sort);
  }

  data = () => {
    const {token} = this.props.auth;
    const page = 1;
    const sort = this.state.sort;
    this.props.historyGetDefault(sort, page, token).then(() => {
      this.setState({data: this.props.transaction.data});
      this.setState({page: 1});
    });
  };

  search = () => {
    const {token} = this.props.auth;
    const search = this.state.search;
    const sort = this.state.sort;
    const page = 1;
    this.props.historyGet(sort, search, page, token).then(() => {
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
    const {token} = this.props.auth;
    const search = this.state.search;
    const page = this.state.page;
    const sort = this.state.sort;
    if (search !== '') {
      this.props.historyGet(sort, search, page, token).then(() => {
        this.setState({
          items: this.state.items.concat(this.props.transaction.search2),
        });
      });
    } else {
      this.props.historyGetDefault(sort, page, token).then(() => {
        this.setState({
          data: this.state.data.concat(this.props.transaction.data),
        });
      });
    }
  };

  handleLoadMore = () => {
    const search = this.state.search;
    if (search !== '') {
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
    } else {
      if (this.state.page < this.props.transaction.pageInfo2.totalPage) {
        this.setState(
          {
            page: this.state.page + 1,
          },
          () => {
            this.infiniteSearch();
          },
        );
      }
    }
  };

  handleChange = val => {
    this.setState({
      search: val,
    });
  };

  render() {
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
          <View>
            <Picker
              style={styles.sortSel}
              itemStyle={styles.textSort}
              selectedValue={this.state.sort}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({sort: itemValue})
              }>
              <Picker.Item label="Terbaru" value="1" />
              <Picker.Item label="Terlama" value="2" />
            </Picker>
          </View>

          {this.state.search === '' ? (
            <FlatList
              style={styles.wrapperCard}
              data={this.state.data}
              renderItem={search => (
                <ItemHistory
                  key={search.item.id}
                  description={search.item.description}
                  refNo={search.item.refNo}
                  phoneRecipient={search.item.phoneRecipient}
                  amount={search.item.amount}
                />
              )}
              keyExtractor={search => search.id}
            />
          ) : (
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
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortSel: {
    width: 150,
    marginBottom: 20,
  },
});
