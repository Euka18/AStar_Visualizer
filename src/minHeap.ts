import { GridObject } from "./Types";

export class minHeap {
  constructor(public heap: GridObject[] = []) {}

  insert(value: GridObject): void {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  bubbleUp(index: number): void {
    while (index > 0) {
      //Parents Childs Formula: 2 * index + 1 (left), 2 * index + 2 (right)
      //From Child to Parent: (index - 1) / 2
      const parentIndex = Math.floor((index - 1) / 2);

      if (this.heap[index].f < this.heap[parentIndex].f) {
        let temp = this.heap[parentIndex];
        this.heap[parentIndex] = this.heap[index];
        this.heap[index] = temp;
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  removeMin(): GridObject {
    const minValue = this.heap[0]; //Top most value is the smallest
    this.heap[0] = this.heap[this.heap.length - 1]; //Swape the smallest element with the last element
    this.heap.pop(); //Remove the last elment of the heap
    this.bubbleDown(0); //Let the new top most element sink down to find its true place

    return minValue;
  }

  bubbleDown(index: number): void {
    const sizeOfHeap = this.heap.length;

    //While we have a left child on the heap
    while (2 * index + 1 < sizeOfHeap) {
      let smallestChildIndex = 2 * index + 1;

      //If a rightchild exists and it is smaller than the left child, than this is our check value index
      if (
        2 * index + 2 < sizeOfHeap &&
        this.heap[2 * index + 2].f < this.heap[smallestChildIndex].f
      ) {
        smallestChildIndex = 2 * index + 2;
      }

      if (this.heap[index].f > this.heap[smallestChildIndex].f) {
        const temp = this.heap[index];
        this.heap[index] = this.heap[smallestChildIndex];
        this.heap[smallestChildIndex] = temp;
        index = smallestChildIndex;
      } else {
        break;
      }
    }
  }
}

//PseudoCode:
/*
    class MinHeap:
    method __init__():
        heap = leeres Array

    method insert(value):
        füge value am Ende von heap hinzu
        bubbleUp(index von value)

    method bubbleUp(index):
        solange index > 0:
            parentIndex = (index - 1) // 2
            wenn heap[index] < heap[parentIndex]:
                tausche heap[index] und heap[parentIndex]
                index = parentIndex
            sonst:
                break

    method removeMin():
        wenn heap ist leer:
            return null
        minValue = heap[0]
        ersetze heap[0] mit letztem Element
        entferne letztes Element
        bubbleDown(0)
        return minValue

    method bubbleDown(index):
        size = Länge von heap
        solange index einen linken Kind hat (2*index+1 < size):
            kleineresKindIndex = linker Kind index
            wenn rechter Kind existiert und heap[rechter] < heap[linker]:
                kleineresKindIndex = rechter Kind index
            wenn heap[index] > heap[kleineresKindIndex]:
                tausche heap[index] mit heap[kleineresKindIndex]
                index = kleineresKindIndex
            sonst:
                break

*/
