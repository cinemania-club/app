import React, { useState } from "react";
import { Text, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { chunk } from "lodash";
import { MOVIE_GENRES } from "../src/filters";
import { palette } from "../src/theme/colors";
import s from "../src/theme/styles";
import { CatalogItemFormat } from "../src/types";
import ActionButton from "./form/ActionButton";
import CheckboxField from "./form/CheckboxField";

type CheckboxOption<T> = {
  label: string;
  value: T;
  initial: boolean;
};

export type FiltersType = {
  formats?: CatalogItemFormat[];
  genres?: number[];
};

export default function (props: {
  filters: FiltersType;
  onFilter: (filters: FiltersType) => void;
}) {
  const [filters, setFilters] = useState(props.filters);

  return (
    <View style={[s.bgDark, s.flex1, s.p3, s.absolute]}>
      <View style={[s.flex1, s.bgMedium, s.rt4, s.p4, s.g4]}>
        <View style={[s.row, s.aiCenter, s.g3]}>
          <MaterialCommunityIcons
            name="filter"
            color={palette.primary}
            size={20}
          />
          <Text style={[s.textStrong, { fontSize: 16 }]}>Filtrar Lista</Text>
        </View>

        <CheckboxFilter
          name="Tipo"
          options={[
            {
              label: "Filmes",
              value: CatalogItemFormat.MOVIE,
              initial: !!filters.formats?.includes(CatalogItemFormat.MOVIE),
            },
            {
              label: "Séries",
              value: CatalogItemFormat.SERIES,
              initial: !!filters.formats?.includes(CatalogItemFormat.SERIES),
            },
          ]}
          selected={filters.formats || []}
          onChange={(formats) => setFilters({ ...filters, formats })}
        />

        <CheckboxFilter
          name="Gênero"
          options={MOVIE_GENRES.map((genre) => ({
            ...genre,
            initial: !!filters.genres?.includes(genre.value),
          }))}
          selected={filters.genres || []}
          onChange={(genres) => setFilters({ ...filters, genres })}
        />
      </View>

      <View style={[s.bgLight, s.p4, s.rb4]}>
        <ActionButton
          icon={<MaterialCommunityIcons name="filter" />}
          title="Filtrar Catálogo"
          onPress={() => props.onFilter(filters)}
        />
      </View>
    </View>
  );
}

function CheckboxFilter<T extends string | number | symbol>(props: {
  name: string;
  options: CheckboxOption<T>[];
  selected: T[];
  onChange: (value: T[]) => void;
}) {
  const optionsChunks = chunk(props.options, 2);

  return (
    <View style={[s.g3]}>
      <Text style={[s.textStrong]}>{props.name}</Text>
      <View style={[s.g3]}>
        {optionsChunks.map((optionsChunk, index) => (
          <View key={index} style={[s.row, s.g5]}>
            {optionsChunk.map((option, index) => {
              const checked = props.selected.includes(option.value);

              return (
                <View key={index} style={[s.flex1]}>
                  <CheckboxField
                    label={option.label}
                    checked={checked}
                    onCheck={() => onCheck(option.value, checked)}
                  />
                </View>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );

  function onCheck(value: T, checked: boolean) {
    const selected = checked
      ? props.selected.filter((e) => e !== value)
      : [...props.selected, value];
    props.onChange(selected);
  }
}
