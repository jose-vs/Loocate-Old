import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  TextInput,
} from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet'
import Animated from 'react-native-reanimated'

const { block, set, greaterThan, lessThan, Value, cond, sub } = Animated

const Lorem = () => (
  <View style={{ backgroundColor: 'green' }}>
    <Text>
      At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
      praesentium voluptatum deleniti atque corrupti quos dolores et quas
      molestias excepturi sint occaecati cupiditate non provident, similique
      sunt in culpa qui officia deserunt mollitia animi, id est laborum et
      dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
      Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
      impedit quo minus id quod maxime placeat facere possimus, omnis voluptas
      assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut
      officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates
      repudiandae sint et molestiae non recusandae. Itaque earum rerum hic
      tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias
      consequatur aut perferendis doloribus asperiores repellat. At vero eos et
      accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
      voluptatum deleniti atque corrupti quos dolores et quas molestias
      excepturi sint occaecati cupiditate non provident, similique sunt in culpa
      qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et
      harum quidem rerum facilis est et expedita distinctio. Nam libero tempore,
      cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod
      maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor
      repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum
      necessitatibus saepe eveniet ut et voluptates repudiandae sint et
      molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente
      delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut
      perferendis doloribus asperiores repellat.
    </Text>
  </View>
)

const BottomSheetTest = () => { 

  trans = new Value(0)
  untraversedPos = new Value(0)
  prevTrans = new Value(0)
  headerPos = block([
    cond(
      lessThan(untraversedPos, sub(trans, 100)),
      set(untraversedPos, sub(trans, 100))
    ),
    cond(
      greaterThan(untraversedPos, trans),
      set(untraversedPos, trans)
    ),
    set(prevTrans, trans),
    untraversedPos,
  ])


  renderHeader = name => (
    <View
      style={{
        width: '100%',
        backgroundColor: 'blue',
        height: 100,
        borderWidth: 2,
      }}
    >
      <Text>{name}</Text>
    </View>
  )

  renderInner = () => (
    <View>
      <Animated.View
        style={{
          zIndex: 1,
          transform: [
            {
              translateY: headerPos,
            },
          ],
        }}
      >
        {renderHeader('one')}
      </Animated.View>
      <Lorem />
      <Lorem />
    </View>
  )

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  )

  bs = React.createRef()

  return (
    <View style={styles.container}>
      <BottomSheet
        contentPosition={trans}
        snapPoints={[100, 400]}
        renderContent={renderInner}
      />
    </View>
  )

}; 

const IMAGE_SIZE = 200

const styles = StyleSheet.create({
  search: {
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  box: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  panel: {
    height: 600,
    padding: 20,
    backgroundColor: '#f7f5eee8',
  },
  header: {
    backgroundColor: '#f7f5eee8',
    shadowColor: '#000000',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#318bfb',
    alignItems: 'center',
    marginVertical: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  photo: {
    width: '100%',
    height: 225,
    marginTop: 30,
  },
  map: {
    height: '100%',
    width: '100%',
  },
})

export default BottomSheetTest; 