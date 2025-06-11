import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F3FF',
    padding: 24,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#3119FC',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#7C19FC',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 16,
  },
button: {
  backgroundColor: '#7C19FC',
  paddingVertical: 12,
  paddingHorizontal: 25,
  borderRadius: 12,
  marginTop: 16,
  alignItems: 'center',
},

buttonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '600',
},
  destaque: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#C619FC',
    textAlign: 'center',
    marginBottom: 20,
  },
  texto: {
    fontSize: 16,
    color: '#000',
    marginBottom: 15,
    textAlign: 'center',
  },

  footer: {
  marginTop: 40,
  alignItems: 'center',
},

resetText: {
  marginTop: 20,
  color: '#3119FC',
  textDecorationLine: 'underline',
  fontSize: 14,
},

});


export default styles;
