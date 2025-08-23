// src/utils/firestore_public_sets.js
import {
  collection,
  query,
  orderBy,
  limit as limitFn,
  startAfter,
  getDocs
} from "firebase/firestore";
import { db } from "../firebase";

const COLL = "public_sets";

/**
 * Fetch first page of public sets, ordered by updatedAt desc.
 * @param {Object} options
 * @param {number} options.pageSize
 * @returns {Promise<{data:Array, lastDoc: any}>}
 */
export async function fetchPublicSetsPage({ pageSize = 20 } = {}) {
  const q = query(collection(db, COLL), orderBy("updatedAt", "desc"), limitFn(pageSize));
  const snap = await getDocs(q);
  const docs = snap.docs.map((d) => ({ id: d.id, ...d.data(), _meta: { __snap: d } }));
  const lastDoc = snap.docs.length ? snap.docs[snap.docs.length - 1] : null;
  return { data: docs, lastDoc };
}

/**
 * Fetch next page after lastDoc
 * @param {Object} options
 * @param {any} options.lastDoc - last firebase doc snapshot from previous page
 * @param {number} options.pageSize
 */
export async function fetchPublicSetsNext({ lastDoc, pageSize = 20 } = {}) {
  if (!lastDoc) return { data: [], lastDoc: null };
  const q = query(collection(db, COLL), orderBy("updatedAt", "desc"), startAfter(lastDoc), limitFn(pageSize));
  const snap = await getDocs(q);
  const docs = snap.docs.map((d) => ({ id: d.id, ...d.data(), _meta: { __snap: d } }));
  const newLast = snap.docs.length ? snap.docs[snap.docs.length - 1] : null;
  return { data: docs, lastDoc: newLast };
}
