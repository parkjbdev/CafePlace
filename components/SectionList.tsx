import { Ionicons } from "@expo/vector-icons";
import { GestureResponderEvent, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewProps } from "react-native";

const SectionList = (props: ViewProps & { title?: string }) => {
  return <View {...props} style={styles.section}>
    {props.title && <Text style={styles.sectionTitle}>{props.title}</Text>}
    <View style={styles.sectionBody}>
      {props.children}
    </View >
  </View >
}

const SectionElement = (props: ViewProps & { textStyle?: StyleProp<TextStyle>, value?: string, isFirst?: boolean, isLast?: boolean, label: string, hideChevron?: boolean, onPress?: (event: GestureResponderEvent) => void }) => {
  const { textStyle, isFirst, isLast, label, hideChevron = false, onPress } = props;
  return <View {...props} style={[styles.rowWrapper, isFirst && styles.rowFirst, isLast && styles.rowLast, (!props.children && hideChevron && isFirst && isLast) && { alignItems: "center" }, props.style]}>
    <TouchableOpacity onPress={onPress} style={styles.row}>
      <Text style={[styles.rowLabel, textStyle]}>{label}</Text>
      <View style={styles.rowSpacer}></View>
      {props.children}
      {props.value && <Text style={styles.rowValue}>{props.value}</Text>}
      {!hideChevron && <Ionicons name="chevron-forward" size={19} color="#bcbcbc" />}
    </TouchableOpacity>
  </View>
}

const styles = StyleSheet.create({
  /** Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#000',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    textAlign: 'center',
  },
  /** Content */
  content: {
    paddingHorizontal: 16,
  },
  contentFooter: {
    marginTop: 24,
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    color: '#a69f9f',
  },
  /** Section */
  section: {
    paddingVertical: 12,
  },
  sectionTitle: {
    margin: 8,
    marginLeft: 12,
    fontSize: 13,
    letterSpacing: 0.33,
    fontWeight: '500',
    color: '#a69f9f',
    textTransform: 'uppercase',
  },
  sectionBody: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  /** Row */
  row: {
    height: 44,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 12,
  },
  rowWrapper: {
    paddingLeft: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#f0f0f0',
  },
  rowFirst: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  rowLabel: {
    fontSize: 16,
    letterSpacing: 0.24,
    color: '#000',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ababab',
    marginRight: 4,
  },
  rowLast: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});

export { SectionList, SectionElement }
