import { gql } from "@apollo/client";

export const ENVIRONMENT_FEEDING_UNIT = gql`
    fragment EnvironmentFeedingUnit on environmentFeedingUnit {
        data
        threshold
        updateTime
    }
`;

export const SET_THRESHOLD = gql`
    ${ENVIRONMENT_FEEDING_UNIT}
    mutation SetThreshold($value: Float!, $property: String!, $id: String!) {
        setThreshold(value: $value, property: $property, id: $id) {
            _id
            name 
            temperature {
                ...EnvironmentFeedingUnit
            }
            o2Gas {
                ...EnvironmentFeedingUnit
            }
            pH {
                ...EnvironmentFeedingUnit
            }
            footCan
            footTray
            fan
        }
    }
`;

