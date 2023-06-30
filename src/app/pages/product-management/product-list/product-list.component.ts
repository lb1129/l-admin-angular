import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ProductType } from '../types'

interface Column {
  title: string
  dataIndex: keyof ProductType
  width?: string
  fixed?: 'left' | 'right'
  ellipsis?: boolean
  align?: 'left' | 'center' | 'right'
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less']
})
export class ProductListComponent implements OnInit {
  constructor(private router: Router) {}
  allChecked = false
  loading = false
  indeterminate = false
  listOfData: readonly ProductType[] = []
  setOfCheckedId = new Set<string>()
  columns: Column[] = [
    {
      title: '名称',
      dataIndex: 'name',
      width: '150px',
      fixed: 'left'
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      width: '150px'
    },
    {
      title: '类别',
      dataIndex: 'category',
      width: '150px'
    },
    {
      title: '价格',
      dataIndex: 'price',
      width: '150px',
      align: 'center'
    },
    {
      title: '颜色',
      dataIndex: 'color',
      width: '150px'
    },
    {
      title: '款式',
      dataIndex: 'style',
      width: '150px',
      ellipsis: true
    },
    {
      title: '是否启用',
      dataIndex: 'enable',
      width: '150px'
    },
    {
      title: '库存',
      dataIndex: 'inventory',
      width: '150px'
    },
    {
      title: '描述',
      dataIndex: 'describe',
      width: '150px'
    }
  ]

  addHandler() {
    this.router.navigate(['/productManagement/productAddOrEdit'])
  }

  deleteHandler(id?: string) {
    const ids = id ? [id] : [...this.setOfCheckedId]
    console.log(ids)
  }

  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id)
    } else {
      this.setOfCheckedId.delete(id)
    }
  }

  refreshCheckedStatus(): void {
    this.allChecked = this.listOfData.every(({ id }) => this.setOfCheckedId.has(id))
    this.indeterminate =
      this.listOfData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.allChecked
  }

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked)
    this.refreshCheckedStatus()
  }

  onAllChecked(checked: boolean): void {
    this.listOfData.forEach(({ id }) => this.updateCheckedSet(id, checked))
    this.refreshCheckedStatus()
  }

  ngOnInit(): void {
    this.listOfData = [
      {
        id: '1',
        name: 'AppleMacBook Air',
        brand: 'Apple',
        category: '电脑整机/笔记本',
        price: 7199.0,
        color: '深空灰色',
        style: '13.3英寸 M1芯片 8+7核 8G+256G',
        enable: true,
        inventory: 33,
        describe: ''
      },
      {
        id: '2',
        name: 'AppleMacBook Air',
        brand: 'Apple',
        category: '电脑整机/笔记本',
        price: 9499.0,
        color: '深空灰色',
        style: '13.3英寸 M1芯片 8+7核 8G+512G',
        enable: true,
        inventory: 0,
        describe: ''
      },
      {
        id: '3',
        name: 'AppleMacBook Air',
        brand: 'Apple',
        category: '电脑整机/笔记本',
        price: 9499.0,
        color: '深空灰色',
        style: '13.3英寸 M1芯片 8+7核 16G+256G',
        enable: true,
        inventory: 0,
        describe: ''
      },
      {
        id: '4',
        name: 'AppleMacBook Air',
        brand: 'Apple',
        category: '电脑整机/笔记本',
        price: 10999.0,
        color: '深空灰色',
        style: '13.3英寸 M1芯片 8+7核 16G+512G',
        enable: true,
        inventory: 0,
        describe: ''
      },
      {
        id: '5',
        name: 'AppleMacBook Air',
        brand: 'Apple',
        category: '电脑整机/笔记本',
        price: 7199.0,
        color: '银色',
        style: '13.3英寸 M1芯片 8+7核 8G+256G',
        enable: true,
        inventory: 33,
        describe: ''
      },
      {
        id: '6',
        name: 'AppleMacBook Air',
        brand: 'Apple',
        category: '电脑整机/笔记本',
        price: 9499.0,
        color: '银色',
        style: '13.3英寸 M1芯片 8+7核 8G+512G',
        enable: true,
        inventory: 0,
        describe: ''
      },
      {
        id: '7',
        name: 'AppleMacBook Air',
        brand: 'Apple',
        category: '电脑整机/笔记本',
        price: 9499.0,
        color: '银色',
        style: '13.3英寸 M1芯片 8+7核 16G+256G',
        enable: true,
        inventory: 0,
        describe: ''
      },
      {
        id: '8',
        name: 'AppleMacBook Air',
        brand: 'Apple',
        category: '电脑整机/笔记本',
        price: 10999.0,
        color: '银色',
        style: '13.3英寸 M1芯片 8+7核 16G+512G',
        enable: true,
        inventory: 0,
        describe: ''
      },
      {
        id: '9',
        name: 'AppleMacBook Air',
        brand: 'Apple',
        category: '电脑整机/笔记本',
        price: 7199.0,
        color: '金色',
        style: '13.3英寸 M1芯片 8+7核 8G+256G',
        enable: true,
        inventory: 33,
        describe: ''
      },
      {
        id: '10',
        name: 'AppleMacBook Air',
        brand: 'Apple',
        category: '电脑整机/笔记本',
        price: 9499.0,
        color: '金色',
        style: '13.3英寸 M1芯片 8+7核 8G+512G',
        enable: true,
        inventory: 0,
        describe: ''
      },
      {
        id: '11',
        name: 'AppleMacBook Air',
        brand: 'Apple',
        category: '电脑整机/笔记本',
        price: 9499.0,
        color: '金色',
        style: '13.3英寸 M1芯片 8+7核 16G+256G',
        enable: true,
        inventory: 0,
        describe: ''
      },
      {
        id: '12',
        name: 'AppleMacBook Air',
        brand: 'Apple',
        category: '电脑整机/笔记本',
        price: 10999.0,
        color: '金色',
        style: '13.3英寸 M1芯片 8+7核 16G+512G',
        enable: true,
        inventory: 0,
        describe: ''
      }
    ]
  }
}
