import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AuthContext } from './common/Context';
import { colors } from './common/Colors';
import { Chip } from 'react-native-paper';
import { useIsFocused } from "@react-navigation/native";
import { fetchApi } from './common/api';
import { config } from '../../config';

export default function Welcom(props) {
  const Users = React.useContext(AuthContext);
    const userName = Users.userDetail.name
    const userEmail = Users.userDetail.email
    const userAuthToken = Users.userToken

    const logOutHandler = () => {
      Users.setUserToken(null)
  }
  const isFocused = useIsFocused()
    const [data, setData] = useState()

   const [loading, setLoading] = useState( false )

    useEffect(() => {
      // setLoading(true)
      async function fetchData() {
      const response = await fetchApi(config.TEST+'collectUsers');
      console.log('responseeeee', response)
      }
  //   if (response.data.status){
  //    setData(response.data.records.filter(el => {
  //     return el.workstatus;
  //  }))
  //  setLoading(false)
  //   }else{
  //     alert("Search Faild please Try Later")
  //     setLoading(false)
  //   }
  fetchData();
    }, [isFocused])
    

    const clickEventListener = (item) => {
        navigation.navigate('Profile', {
            item: item,
          })
        // alert('Inprogress')
    }

    if ( loading ) {
      return (
         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', }}>
            <ActivityIndicator size="large" color={colors.primaryColor} />
         </View>
      );
   }
  return (
    <View style={{flex:1,backgroundColor:colors.dolphin}}>
      <View style={{flex:0.2,justifyContent:'center',alignItems:'center'}}>
        <View>
      <Text style={{fontSize:18,fontWeight:'bold',color:colors.defaultWhite}}>Welcome {userEmail}</Text>
      <View style={{width:90,alignSelf:'center',marginTop:20}}>
  <Chip icon="logout-variant" mode={'outlined'} onPress={() => logOutHandler()}>log out</Chip>
</View>
        </View>
      </View>


      <View style={styles.container}>
        {data ? <FlatList style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={data}
          horizontal={false}
          numColumns={2}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={styles.card} onPress={() => {alert('inprogress')}}>
                <View style={styles.cardHeader}>
                  <Image style={styles.icon} source={{uri:"https://img.icons8.com/flat_round/64/000000/hearts.png"}}/>
                </View>
                {/* <Image style={styles.userImage} source={{uri:item.image}}/>  */}
                <View style={styles.cardFooter}>
                  <View style={{alignItems:"center", justifyContent:"center"}}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.position}>{item.jobcategory}</Text>
                    <TouchableOpacity style={styles.followButton} onPress={()=>alert('inprogress')}>
                      <Text style={styles.followButtonText}>View </Text>  
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }}/>: 
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>No Data Available</Text>
            </View>}
      </View>


    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor:"#E6E6E6",
    paddingTop:20
  },
  listContainer:{
   alignItems:'center'
  },
  /******** card **************/
  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 5,
    backgroundColor:"white",
    flexBasis: '46%',
    marginHorizontal: 5,
  },
  cardFooter: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems:"center", 
    justifyContent:"center"
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardHeader:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  userImage:{
    height: 120,
    width: 120,
    borderRadius:60,
    alignSelf:'center',
    borderColor:"#DCDCDC",
    borderWidth:3,
  },
  name:{
    fontSize:18,
    flex:1,
    alignSelf:'center',
    color:"#008080",
    fontWeight:'bold'
  },
  position:{
    fontSize:14,
    flex:1,
    alignSelf:'center',
    color:"#696969"
  },
  followButton: {
    marginTop:10,
    height:35,
    width:100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  followButtonText:{
    color: "#FFFFFF",
    fontSize:20,
  },
  icon:{
    height: 20,
    width: 20, 
  }
});  