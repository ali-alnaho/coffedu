import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

import useDistributeStudents from '../hooks/useDistributeStudents';
const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: '#e5e7eb', // similar to bg-gray-200
  },
  hallSection: {
    marginBottom: 20,
  },
  hallName: {
    fontSize: 16,
    fontWeight: 600,
    color: '#1f2937', // text-gray-800
    marginBottom: 8,
  },
  seatsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    alignItems: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  seat: {
    fontSize: 10,
    fontWeight: 500,
    color: '#166534', // text-green-800
    border: '2px solid #000',
    padding: 6,
  },
});

export function SeatingDocument() {
  const { examHallSeating } = useDistributeStudents();
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {examHallSeating.map((hall) => (
          <View key={hall.hallId} style={styles.hallSection}>
            <Text style={styles.hallName}>{hall.hallName}</Text>

            <View style={styles.seatsContainer}>
              {hall.seats.map((row, rowIndex) => (
                <View key={`row-${rowIndex}`} style={styles.row}>
                  {row.map((seat) => (
                    <View key={seat.id} style={styles.seat}>
                      {seat.status === 'blocked' ? (
                        <Text>
                          ({seat.row}-{seat.column}): X
                        </Text>
                      ) : (
                        <Text>
                          ({seat.row}-{seat.column}: {seat.student?.id}):{' '}
                          {seat.student?.name}
                        </Text>
                      )}
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
}
