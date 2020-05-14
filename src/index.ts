import { Eq, fromEquals, strictEqual } from 'fp-ts/lib/Eq';
import * as O from 'fp-ts/lib/Option';
import * as ReadonlyArray from 'fp-ts/lib/ReadonlyArray';
import * as t from 'io-ts';
import { option } from 'io-ts-types/lib/option';
import * as React from 'react';
import {
    useCustomCompareCallback,
    useCustomCompareEffect,
    useCustomCompareMemo,
} from 'use-custom-compare';

const optionUnknownT = option(t.unknown);

const eqStrict = fromEquals(strictEqual);

export const eqDependency: Eq<unknown> = fromEquals((a, b) =>
    optionUnknownT.is(a) && optionUnknownT.is(b)
        ? eqOptionDependency.equals(a, b)
        : eqStrict.equals(a, b),
);

const eqOptionDependency = O.getEq(eqDependency);

const eqDependencies = ReadonlyArray.getEq(eqDependency);

export const useCallback: typeof React.useCallback = (fn, dependencies) =>
    useCustomCompareCallback(fn, dependencies ?? [], eqDependencies.equals);

export const useEffect: typeof React.useEffect = (fn, dependencies) =>
    useCustomCompareEffect(fn, dependencies ?? [], eqDependencies.equals);

export const useMemo: typeof React.useMemo = (fn, dependencies) =>
    useCustomCompareMemo(fn, dependencies ?? [], eqDependencies.equals);
