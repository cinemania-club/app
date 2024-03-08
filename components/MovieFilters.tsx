import { FontAwesome } from "@expo/vector-icons";
import {
  CheckIcon,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  HStack,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import React from "react";

import { gluestackUIConfig } from "../config/gluestack-ui.config";

export default function MovieFilters(props: {
  checkedDrama: boolean;
  setCheckedDrama: React.Dispatch<React.SetStateAction<boolean>>;
  checkedAcao: boolean;
  setCheckedAcao: React.Dispatch<React.SetStateAction<boolean>>;
  getGenre: () => void;
}) {
  const primaryColor = gluestackUIConfig.tokens.colors.primary;

  return (
    <ScrollView bg="$darkBackground" flex={1} p="$4">
      <VStack bg="$mediumBackground" p="$4" space="md">
        <HStack space="md">
          <FontAwesome name="filter" size={24} color={primaryColor} />
          <Text bold color="$primary">
            Filtrar Lista
          </Text>
        </HStack>
        <Text bold color="$primary" size="sm">
          Streamings
        </Text>
        <HStack>
          <Text color="$text">Filtrando por seus streamings</Text>
          <Text color="$primary">(8)</Text>
        </HStack>
        <HStack>
          <Text color="$primary">Editar streamings</Text>
        </HStack>
        <Text color="$primary">Tipo</Text>
        <HStack>
          <Text color="$text">Filme</Text>
          <Text color="$text">Série</Text>
          <Text color="$text">Minissérie</Text>
        </HStack>
        <Text color="$primary">Gênero</Text>
        <HStack flexWrap="wrap" space="sm">
          <Checkbox
            value="teste"
            onChange={props.setCheckedDrama}
            size="md"
            aria-label="teste"
            isChecked={props.checkedDrama}
          >
            <CheckboxIndicator mr="$2">
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <CheckboxLabel>Drama</CheckboxLabel>
          </Checkbox>
          <Checkbox
            value="teste"
            onChange={props.setCheckedAcao}
            size="md"
            aria-label="teste"
            isChecked={props.checkedAcao}
          >
            <CheckboxIndicator mr="$2">
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <CheckboxLabel>Ação</CheckboxLabel>
          </Checkbox>
        </HStack>

        <Pressable
          onPress={props.getGenre}
          p="$5"
          bg="$primary500"
          $hover-bg="$primary400"
        >
          <Text color="white">Press me</Text>
        </Pressable>
      </VStack>
    </ScrollView>
  );
}
