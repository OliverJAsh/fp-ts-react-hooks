import * as A from 'fp-ts/lib/Array';
import { Eq, fromEquals, strictEqual } from 'fp-ts/lib/Eq';
import * as O from 'fp-ts/lib/Option';
import * as ReadonlyArray from 'fp-ts/lib/ReadonlyArray';
import * as Record from 'fp-ts/lib/Record';
import * as t from 'io-ts';
import { option } from 'io-ts-types/lib/option';
import * as React from 'react';
import * as reselect from 'reselect';
import {
    useCustomCompareCallback,
    useCustomCompareEffect,
    useCustomCompareMemo,
} from 'use-custom-compare';

const optionUnknownT = option(t.unknown);

const eqStrict = fromEquals(strictEqual);

export const eq: Eq<unknown> = fromEquals((a, b) =>
    optionUnknownT.is(a) && optionUnknownT.is(b)
        ? eqOption.equals(a, b)
        : Array.isArray(a) && Array.isArray(b)
        ? eqArray.equals(a, b)
        : eqStrict.equals(a, b),
);

const eqOption = O.getEq(eq);
const eqArray = A.getEq(eq);

const eqDependencies = ReadonlyArray.getEq(eq);

const eqProps = Record.getEq(eq);

export const useCallback: typeof React.useCallback = (fn, dependencies) =>
    useCustomCompareCallback(fn, dependencies ?? [], eqDependencies.equals);

export const useEffect: typeof React.useEffect = (fn, dependencies) =>
    useCustomCompareEffect(fn, dependencies ?? [], eqDependencies.equals);

export const useMemo: typeof React.useMemo = (fn, dependencies) =>
    useCustomCompareMemo(fn, dependencies ?? [], eqDependencies.equals);

export const memo = <P extends object>(
    Component: React.FC<P>,
): React.NamedExoticComponent<P> => React.memo(Component, eqProps.equals);

export const createSelector = reselect.createSelectorCreator(
    reselect.defaultMemoize,
    eq.equals,
);
