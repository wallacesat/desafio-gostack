import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Platform } from 'react-native';
import { subDays, addDays, getTime, parseISO, startOfYear } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Meetup from '~/components/Meetup';
import Background from '~/components/Background';
import Header from '~/components/Header';
import Loader from '~/components/Loader';
import EmptyMeetups from '~/components/Empty';

import DateNavigate from './DateNavigate';

import {
  Container,
  List,
  DatePicker,
  AuxiliarButtons,
  CancelButton,
  ConfirmButton,
  TextButton,
} from './styles';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [scrollFetching, setScrollFetching] = useState(false);
  const [scrollable, setScrollable] = useState(true);
  const [date, setDate] = useState(new Date().getTime());
  const [selectedDatePicker, setSelectedDatePicker] = useState(date);
  const [page, setPage] = useState(1);
  const [meetups, setMeetups] = useState([]);
  const [emptyText, setEmptyText] = useState(
    'Nenhum meetup foi cadastrado na plataforma ainda'
  );

  async function fetchMeetups(fetchPage, fetchDate, navigate = '') {
    const response = await api.get(
      `/meetups?page=${fetchPage}&date=${fetchDate}${
        navigate ? '&' : ''
      }${navigate}`
    );
    return response;
  }

  useEffect(() => {
    setLoading(true);

    async function laodMeetups() {
      const response = await fetchMeetups(page, date, 'next=true');

      if (response.data[0]) {
        setEmptyText('Nenhum meetup foi cadastrado nesse dia ainda');
        setDate(getTime(parseISO(response.data[0].date)));
      }

      setMeetups(response.data);
      setLoading(false);
    }

    laodMeetups();
  }, []);

  async function handleNext() {
    setLoading(true);
    setShowDatepicker(false);

    const nextDate = getTime(addDays(date, 1));
    const response = await fetchMeetups(1, nextDate, 'next=true');

    const newDate = response.data[0]
      ? getTime(parseISO(response.data[0].date))
      : nextDate;

    setScrollable(true);
    setMeetups(response.data);
    setDate(newDate);
    setSelectedDatePicker(newDate);
    setPage(1);
    setLoading(false);
  }

  async function handlePrevious() {
    setShowDatepicker(false);
    setLoading(true);

    const previousDate = getTime(subDays(date, 1));
    const response = await fetchMeetups(1, previousDate, 'previous=true');

    const newDate = response.data[0]
      ? getTime(parseISO(response.data[0].date))
      : previousDate;

    setScrollable(true);
    setMeetups(response.data);
    setDate(newDate);
    setSelectedDatePicker(newDate);
    setPage(1);
    setLoading(false);
  }

  async function handleScrollLoading() {
    if (scrollFetching || !scrollable) return;
    setScrollFetching(true);
    const response = await fetchMeetups(page + 1, date);

    if (!response.data[0]) {
      setScrollable(false);
      setScrollFetching(false);
      return;
    }

    setScrollable(true);
    setMeetups([...meetups, ...response.data]);
    setPage(page + 1);
    setScrollFetching(false);
  }

  function renderFooter() {
    if (!scrollFetching) return null;

    return (
      <View style={{ marginBottom: 15 }}>
        <ActivityIndicator size="large" color="#d44059" />
      </View>
    );
  }

  async function fetchSelectedDate(pickerDate = false) {
    setLoading(true);
    setShowDatepicker(false);

    const response = await fetchMeetups(
      1,
      getTime(pickerDate || selectedDatePicker)
    );

    const newDate = response.data[0]
      ? getTime(parseISO(response.data[0].date))
      : selectedDatePicker;

    setScrollable(true);
    setMeetups(response.data);
    setDate(newDate);
    setPage(1);
    setLoading(false);
  }

  function handleShowDatepicker() {
    setSelectedDatePicker(date);
    setShowDatepicker(true);
  }

  function handleSetSelectedDatePicker(e, pickerDate) {
    if (pickerDate === undefined) {
      setShowDatepicker(false);
      return;
    }

    if (Platform.OS !== 'ios') {
      setShowDatepicker(false);
      fetchSelectedDate(pickerDate);
    }

    setSelectedDatePicker(pickerDate);
  }

  return (
    <Background>
      <Container>
        <Header />

        {loading && <Loader size="large" color="#d44059" />}
        {!loading && (
          <List
            data={meetups}
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item }) => (
              <Meetup data={item} btnText="Realizar inscrição" />
            )}
            ListEmptyComponent={<EmptyMeetups>{emptyText}</EmptyMeetups>}
            ListHeaderComponent={
              <DateNavigate
                date={date}
                next={handleNext}
                previous={handlePrevious}
                handleShowDatepicker={handleShowDatepicker}
              />
            }
            onEndReached={handleScrollLoading}
            onEndReachedThreshold={0.1}
            ListFooterComponent={renderFooter}
          />
        )}

        {showDatepicker && (
          <DatePicker>
            {Platform.OS === 'ios' && (
              <AuxiliarButtons>
                <CancelButton onPress={() => setShowDatepicker(false)}>
                  <TextButton>Cancelar</TextButton>
                </CancelButton>
                <ConfirmButton onPress={() => fetchSelectedDate(false)}>
                  <TextButton>Confirmar</TextButton>
                </ConfirmButton>
              </AuxiliarButtons>
            )}
            {showDatepicker && (
              <DateTimePicker
                value={new Date(selectedDatePicker)}
                minimumDate={startOfYear(new Date())}
                display="calendar"
                onChange={(e, pickerDate) =>
                  handleSetSelectedDatePicker(e, pickerDate)
                }
                locale="pt-BR"
              />
            )}
          </DatePicker>
        )}
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="list" size={26} color={tintColor} />
  ),
};
